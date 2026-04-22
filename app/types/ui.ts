import type { Biomarker, PatientInfo } from "./biomarker";
import type { BiomarkerStatus } from "@/app/enums/biomarker-status";
import { FILTER_ALL } from "@/app/constants/biomarker";

export interface FileDropzoneProps {
  files: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
}

export interface BiomarkerTableProps {
  biomarkers: Biomarker[];
}

export interface PatientInfoCardProps {
  patient: PatientInfo;
}

export interface StatusBadgeProps {
  status: BiomarkerStatus;
  className?: string;
}

export interface BiomarkerFilterButtonsProps {
  biomarkers: Biomarker[];
  filter: BiomarkerStatus | typeof FILTER_ALL;
  onFilterChange: (filter: BiomarkerStatus | typeof FILTER_ALL) => void;
}
