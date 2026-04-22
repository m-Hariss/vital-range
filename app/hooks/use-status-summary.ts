import type { Biomarker } from "@/app/types/biomarker";
import { BiomarkerStatus } from "@/app/enums/biomarker-status";
import { SUMMARY_ORDER } from "@/app/constants/biomarker";

export function useStatusSummary(biomarkers: Biomarker[]) {
  const counts = SUMMARY_ORDER.reduce<Record<BiomarkerStatus, number>>(
    (acc, s) => ({ ...acc, [s]: 0 }),
    {} as Record<BiomarkerStatus, number>
  );
  
  biomarkers.forEach((b) => {
    counts[b.status] = (counts[b.status] ?? 0) + 1;
  });

  return { counts };
}
