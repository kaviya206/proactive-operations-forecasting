import { QueueData, BacklogPrediction, Recommendation } from './types';

export const queuesData: QueueData[] = [
  {
    queueName: 'Intake',
    wip: 45,
    availableStaff: 8,
    slaRiskProbability: 12,
    status: 'green',
    processingRate: 12
  },
  {
    queueName: 'Review',
    wip: 127,
    availableStaff: 5,
    slaRiskProbability: 85,
    status: 'red',
    processingRate: 8
  },
  {
    queueName: 'Approval',
    wip: 38,
    availableStaff: 6,
    slaRiskProbability: 28,
    status: 'amber',
    processingRate: 10
  }
];

export const backlogPredictions: BacklogPrediction[] = [
  { hour: 0, backlog: 127 },
  { hour: 1, backlog: 142 },
  { hour: 2, backlog: 158 },
  { hour: 3, backlog: 175 },
  { hour: 4, backlog: 193 }
];

export const recommendation: Recommendation = {
  fromQueue: 'Intake',
  toQueue: 'Review',
  staffCount: 2,
  expectedRiskReduction: 32,
  confidence: 87
};
