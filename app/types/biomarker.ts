import { BiomarkerStatus } from "@/app/enums/biomarker-status";
import { Sex } from "@/app/enums/sex";

export interface PatientInfo {
  name: string | null;
  age: number | null;
  sex: Sex;
  collection_date: string | null;
  report_date: string | null;
  notes: string | null;
}

export interface Biomarker {
  name: string;
  original_name: string | null;
  value: number | null;
  value_text: string | null;
  unit: string | null;
  reference_range: string | null;
  reference_low: number | null;
  reference_high: number | null;
  status: BiomarkerStatus;
  explanation: string | null;
}

export interface LabReportExtraction {
  patient: PatientInfo;
  biomarkers: Biomarker[];
}

export interface ExtractionResult {
  fileName: string;
  data: LabReportExtraction | null;
  error: string | null;
}
