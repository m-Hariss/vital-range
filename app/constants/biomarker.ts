import { BiomarkerStatus } from "@/app/enums/biomarker-status";

export const STATUS_LABEL: Record<BiomarkerStatus, string> = {
  [BiomarkerStatus.OPTIMAL]: "Optimal",
  [BiomarkerStatus.NORMAL]: "Normal",
  [BiomarkerStatus.OUT_OF_RANGE]: "Out of range",
  [BiomarkerStatus.UNKNOWN]: "Unknown",
};

export const STATUS_BADGE_CLASS: Record<BiomarkerStatus, string> = {
  [BiomarkerStatus.OPTIMAL]:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  [BiomarkerStatus.NORMAL]:
    "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
  [BiomarkerStatus.OUT_OF_RANGE]:
    "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
  [BiomarkerStatus.UNKNOWN]:
    "bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300",
};

export const STATUS_DOT_CLASS: Record<BiomarkerStatus, string> = {
  [BiomarkerStatus.OPTIMAL]: "bg-emerald-500",
  [BiomarkerStatus.NORMAL]: "bg-sky-500",
  [BiomarkerStatus.OUT_OF_RANGE]: "bg-rose-500",
  [BiomarkerStatus.UNKNOWN]: "bg-zinc-400",
};

export const ROW_TINT_CLASS: Record<BiomarkerStatus, string> = {
  [BiomarkerStatus.OPTIMAL]: "hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20",
  [BiomarkerStatus.NORMAL]: "hover:bg-sky-50/60 dark:hover:bg-sky-950/20",
  [BiomarkerStatus.OUT_OF_RANGE]: "bg-rose-50/40 hover:bg-rose-50 dark:bg-rose-950/20 dark:hover:bg-rose-950/30",
  [BiomarkerStatus.UNKNOWN]: "hover:bg-muted",
};

export const TILE_CLASS: Record<BiomarkerStatus, string> = {
  [BiomarkerStatus.OPTIMAL]:
    "from-emerald-50 to-white text-emerald-900 ring-emerald-200 dark:from-emerald-950/60 dark:to-transparent dark:text-emerald-200 dark:ring-emerald-900",
  [BiomarkerStatus.NORMAL]:
    "from-sky-50 to-white text-sky-900 ring-sky-200 dark:from-sky-950/60 dark:to-transparent dark:text-sky-200 dark:ring-sky-900",
  [BiomarkerStatus.OUT_OF_RANGE]:
    "from-rose-50 to-white text-rose-900 ring-rose-200 dark:from-rose-950/60 dark:to-transparent dark:text-rose-200 dark:ring-rose-900",
  [BiomarkerStatus.UNKNOWN]:
    "from-zinc-50 to-white text-zinc-900 ring-zinc-200 dark:from-zinc-900/60 dark:to-transparent dark:text-zinc-200 dark:ring-zinc-800",
};

export const FILTER_ALL = "all" as const;

export const FILTER_ORDER: (BiomarkerStatus | typeof FILTER_ALL)[] = [
  FILTER_ALL,
  BiomarkerStatus.OPTIMAL,
  BiomarkerStatus.NORMAL,
  BiomarkerStatus.OUT_OF_RANGE,
  BiomarkerStatus.UNKNOWN,
];

export const FILTER_LABELS: Record<BiomarkerStatus | typeof FILTER_ALL, string> = {
  [FILTER_ALL]: "All",
  ...STATUS_LABEL,
};

export const SUMMARY_ORDER: BiomarkerStatus[] = [
  BiomarkerStatus.OPTIMAL,
  BiomarkerStatus.NORMAL,
  BiomarkerStatus.OUT_OF_RANGE,
  BiomarkerStatus.UNKNOWN,
];

export const TABLE_HEADERS = [
  { key: "biomarker", label: "Biomarker", className: undefined },
  { key: "value", label: "Value", className: undefined },
  { key: "unit", label: "Unit", className: undefined },
  { key: "reference", label: "Reference", className: undefined },
  { key: "status", label: "Status", className: undefined },
  { key: "notes", label: "Notes", className: "min-w-[200px]" },
] as const;
