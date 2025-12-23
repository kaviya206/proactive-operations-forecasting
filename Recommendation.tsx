import { recommendation } from '../mockData';
import { ArrowRight, CheckCircle, Info } from 'lucide-react';

export default function Recommendations() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Recommended Actions
      </h2>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-medium text-gray-900">
              Suggested Staffing Optimization
            </h3>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            Priority: High
          </span>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">From</div>
              <div className="px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-gray-900">
                {recommendation.fromQueue}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <ArrowRight className="w-8 h-8 text-blue-600 mb-1" />
              <div className="text-xs text-gray-600 font-medium">
                Move {recommendation.staffCount} staff
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">To</div>
              <div className="px-4 py-2 bg-white border border-gray-300 rounded-md font-medium text-gray-900">
                {recommendation.toQueue}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-4 bg-white rounded-md border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Expected Risk Reduction</div>
              <div className="text-2xl font-semibold text-green-600">
                {recommendation.expectedRiskReduction}%
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-md border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Confidence Level</div>
              <div className="text-2xl font-semibold text-blue-600">
                {recommendation.confidence}%
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Analysis</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              The Review queue is currently experiencing high SLA risk (85%) with only 5 staff
              members processing 127 items. Meanwhile, the Intake queue is operating below capacity
              with 8 staff members and lower workload.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Expected Impact</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Review queue SLA risk reduced from 85% to approximately 53%</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Processing capacity in Review increases by 40%</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span>Intake queue risk may increase slightly to 20% (still within acceptable range)</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Recommended Timeline</h4>
            <p className="text-sm text-gray-700">
              Implement within the next 30-60 minutes to prevent SLA breaches in the Review queue.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
        <Info className="w-5 h-5 text-yellow-700 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-yellow-800 mb-1">
            Advisory Notice
          </p>
          <p className="text-sm text-yellow-700">
            Recommendations are advisory and require human approval. Please verify operational
            constraints and staff availability before implementing any staffing changes.
          </p>
        </div>
      </div>
    </div>
  );
}
