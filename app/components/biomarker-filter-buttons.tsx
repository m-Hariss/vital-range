import type { Biomarker } from "@/app/types/biomarker";
import type { BiomarkerStatus } from "@/app/enums/biomarker-status";
import { FILTER_ORDER, FILTER_LABELS, FILTER_ALL } from "@/app/constants/biomarker";
import { cn } from "@/lib/utils";
import type { BiomarkerFilterButtonsProps } from "@/app/types/ui";

export function BiomarkerFilterButtons({
  biomarkers,
  filter,
  onFilterChange,
}: BiomarkerFilterButtonsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {FILTER_ORDER.map((f) => {
        const label = FILTER_LABELS[f];
        const count =
          f === FILTER_ALL
            ? biomarkers.length
            : biomarkers.filter((b) => b.status === f).length;
        const active = filter === f;
        return (
          <button
            key={f}
            type="button"
            onClick={() => onFilterChange(f)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all",
              active
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-background hover:-translate-y-px hover:border-primary/40 hover:bg-muted"
            )}
          >
            {label}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] tabular-nums",
                active ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground"
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
