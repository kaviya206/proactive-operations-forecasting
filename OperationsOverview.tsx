import { queuesData, backlogPredictions } from '../mockData';
import { AlertCircle } from 'lucide-react';

export default function OperationsOverview() {
  const maxBacklog = Math.max(...backlogPredictions.map(p => p.backlog));

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Operations Health Overview
      </h2>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Queue Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current WIP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Available Staff
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SLA Risk Probability
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {queuesData.map((queue) => (
              <tr key={queue.queueName}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {queue.queueName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {queue.wip}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {queue.availableStaff}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {queue.slaRiskProbability}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      queue.status === 'green'
                        ? 'bg-green-100 text-green-800'
                        : queue.status === 'amber'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {queue.status.charAt(0).toUpperCase() + queue.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Predicted Backlog Growth (Next 4 Hours)
          </h3>
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <line
                x1="40"
                y1="180"
                x2="380"
                y2="180"
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <line
                x1="40"
                y1="20"
                x2="40"
                y2="180"
                stroke="#e5e7eb"
                strokeWidth="1"
              />

              {backlogPredictions.map((point, index) => {
                const x = 40 + (index * 85);
                const y = 180 - ((point.backlog / maxBacklog) * 140);
                return (
                  <g key={point.hour}>
                    <circle cx={x} cy={y} r="4" fill="#2563eb" />
                    <text x={x} y="195" textAnchor="middle" fontSize="12" fill="#6b7280">
                      {point.hour}h
                    </text>
                    <text x={x} y={y - 10} textAnchor="middle" fontSize="11" fill="#374151">
                      {point.backlog}
                    </text>
                  </g>
                );
              })}

              <polyline
                points={backlogPredictions.map((p, i) => {
                  const x = 40 + (i * 85);
                  const y = 180 - ((p.backlog / maxBacklog) * 140);
                  return `${x},${y}`;
                }).join(' ')}
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
              />

              <text x="10" y="105" fontSize="12" fill="#6b7280" transform="rotate(-90 10 105)">
                Backlog
              </text>
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Key Insights
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Based on current processing speed, <strong>Review</strong> has an{' '}
                <strong className="text-red-600">85% probability of SLA breach</strong>{' '}
                in 4 hours.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mt-4">
                Current processing rate: 8 items/hour with 127 items in queue.
                At this rate, backlog will grow to 193 items by hour 4.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mt-4">
                <span className="text-green-600 font-medium">Intake queue</span> is
                operating within normal parameters with sufficient staffing levels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
