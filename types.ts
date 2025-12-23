export interface QueueData {
  queueName: string;
  wip: number;
  availableStaff: number;
  slaRiskProbability: number;
  status: 'green' | 'amber' | 'red';
  processingRate: number;
}

export interface BacklogPrediction {
  hour: number;
  backlog: number;
}

export interface Recommendation {
  fromQueue: string;
  toQueue: string;
  staffCount: number;
  expectedRiskReduction: number;
  confidence: number;
}

export interface SimulationResult {
  queue: string;
  originalRisk: number;
  newRisk: number;
  improvement: number;
}
