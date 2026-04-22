export enum BiomarkerStatus {
  OPTIMAL = "optimal",
  NORMAL = "normal",
  OUT_OF_RANGE = "out_of_range",
  UNKNOWN = "unknown",
}

export const BIOMARKER_STATUS_VALUES = [
  BiomarkerStatus.OPTIMAL,
  BiomarkerStatus.NORMAL,
  BiomarkerStatus.OUT_OF_RANGE,
  BiomarkerStatus.UNKNOWN,
] as const;
