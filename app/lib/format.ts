import type { Biomarker } from "@/app/types/biomarker";

export function formatBiomarkerValue(b: Biomarker): string {
  if (b.value_text) return b.value_text;
  if (b.value == null) return "—";
  return String(b.value);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
