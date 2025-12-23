import { useState } from 'react';
import { queuesData } from '../mockData';
import { SimulationResult } from '../types';
import { TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';

export default function WhatIfSimulation() {
  const [fromQueue, setFromQueue] = useState('Intake');
  const [toQueue, setToQueue] = useState('Review');
  const [staffCount, setStaffCount] = useState(2);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [hasSimulated, setHasSimulated] = useState(false);

  const runSimulation = () => {
    const results: SimulationResult[] = [];

    queuesData.forEach(queue => {
      let newRisk = queue.slaRiskProbability;

      if (queue.queueName === fromQueue) {
        const staffLoss = staffCount / queue.availableStaff;
        newRisk = Math.min(100, queue.slaRiskProbability + (staffLoss * 30));
      } else if (queue.queueName === toQueue) {
        const staffGain = staffCount / queue.availableStaff;
        newRisk = Math.max(0, queue.slaRiskProbability - (staffGain * 35));
      }

      results.push({
        queue: queue.queueName,
        originalRisk: queue.slaRiskProbability,
        newRisk: Math.round(newRisk),
        improvement: Math.round(queue.slaRiskProbability - newRisk)
      });
    });

    setSimulationResults(results);
    setHasSimulated(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        What-If Scenario Simulator
      </h2>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Move Staff FROM
            </label>
            <select
              value={fromQueue}
              onChange={(e) => setFromQueue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {queuesData.map(queue => (
                <option key={queue.queueName} value={queue.queueName}>
                  {queue.queueName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Move Staff TO
            </label>
            <select
              value={toQueue}
              onChange={(e) => setToQueue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {queuesData.map(queue => (
                <option key={queue.queueName} value={queue.queueName}>
                  {queue.queueName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Staff
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={staffCount}
              onChange={(e) => setStaffCount(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={runSimulation}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Run Simulation
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-start space-x-2 text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-md p-3">
          <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p>
            This is a virtual simulation. No real operations are impacted.
          </p>
        </div>
      </div>

      {hasSimulated && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Simulation Results
          </h3>
          <div className="space-y-4">
            {simulationResults.map((result) => (
              <div
                key={result.queue}
                className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      {result.queue}
                    </h4>
                    <div className="flex items-center space-x-6 text-sm">
                      <div>
                        <span className="text-gray-500">Original Risk: </span>
                        <span className="font-medium text-gray-900">
                          {result.originalRisk}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">New Risk: </span>
                        <span className="font-medium text-gray-900">
                          {result.newRisk}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {result.improvement > 0 ? (
                      <>
                        <TrendingDown className="w-5 h-5 text-green-600" />
                        <span className="text-green-600 font-medium">
                          -{result.improvement}%
                        </span>
                      </>
                    ) : result.improvement < 0 ? (
                      <>
                        <TrendingUp className="w-5 h-5 text-red-600" />
                        <span className="text-red-600 font-medium">
                          +{Math.abs(result.improvement)}%
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-500 font-medium">No change</span>
                    )}
                  </div>
                </div>
                {result.queue === toQueue && result.improvement > 0 && (
                  <p className="mt-2 text-sm text-gray-600">
                    Moving {staffCount} staff to {toQueue} reduces SLA risk by approximately{' '}
                    {result.improvement}%, improving processing capacity.
                  </p>
                )}
                {result.queue === fromQueue && result.improvement < 0 && (
                  <p className="mt-2 text-sm text-gray-600">
                    Removing {staffCount} staff from {fromQueue} increases SLA risk by{' '}
                    {Math.abs(result.improvement)}%, reducing processing capacity.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
