%%writefile models.py
from dataclasses import dataclass
from typing import List

@dataclass
class Case:
    arrival_time: float
    complexity: float
    sla_deadline: float   # hours

@dataclass
class Worker:
    skill: str
    speed: float   # cases/hour
    available: bool = True

class QueueState:
    def _init_(self, name: str, cases: List[Case], workers: List[Worker]):
        self.name = name
        self.cases = cases
        self.workers = workers

  %%writefile simulation.py
def forecast_sla_risk(queue, runs=1000):
    breaches = 0

    for _ in range(runs):
        total_capacity = sum(w.speed for w in queue.workers)
        total_work = sum(c.complexity for c in queue.cases)

        if total_capacity == 0:
            breaches += 1
            continue

        processing_time = total_work / total_capacity
        sla = queue.cases[0].sla_deadline

        if processing_time > sla:
            breaches += 1

    return breaches / runs

%%writefile optimizer.py
import copy
from simulation import forecast_sla_risk

def simulate_staff_move(state, from_q, to_q, count):
    new_state = copy.deepcopy(state)

    moved = new_state[from_q].workers[:count]
    new_state[from_q].workers = new_state[from_q].workers[count:]
    new_state[to_q].workers.extend(moved)

    return new_state

def optimize_staff_allocation(state):
    best_move = None
    lowest_risk = 1.0

    for i in range(1, min(4, len(state["intake"].workers))):
        sim_state = simulate_staff_move(state, "intake", "review", i)
        risk = forecast_sla_risk(sim_state["review"])

        if risk < lowest_risk:
            lowest_risk = risk
            best_move = i

    return best_move, lowest_risk
%%writefile main.py
from models import Case, Worker, QueueState
from simulation import forecast_sla_risk
from optimizer import optimize_staff_allocation
import random

def get_current_state():
    return {
        "intake": QueueState(
            "intake",
            cases=[Case(0, random.uniform(0.8,1.5), 8) for _ in range(40)],
            workers=[Worker("intake", 5) for _ in range(5)]
        ),
        "review": QueueState(
            "review",
            cases=[Case(0, random.uniform(1.2,2.5), 12) for _ in range(25)],
            workers=[Worker("review", 3) for _ in range(3)]
        )
    }

state = get_current_state()

risk = forecast_sla_risk(state["intake"])
print(f"Intake SLA Risk: {risk:.2%}")

move, new_risk = optimize_staff_allocation(state)
print(f"Suggested Move: {move} → Review | Risk ↓ to {new_risk:.2%}")
