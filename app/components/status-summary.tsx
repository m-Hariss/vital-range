import { STATUS_LABEL, SUMMARY_ORDER, TILE_CLASS } from "@/app/constants/biomarker";
import { cn } from "@/lib/utils";
import { useStatusSummary } from "@/app/hooks/use-status-summary";
import type { StatusSummaryProps } from "@/app/types/ui";

export function StatusSummary({ biomarkers }: StatusSummaryProps) {
  const { counts } = useStatusSummary(biomarkers);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {SUMMARY_ORDER.map((status) => (
        <div
          key={status}
          className={cn(
            "rounded-xl bg-linear-to-b p-4 ring-1 ring-inset transition-transform duration-150 hover:-translate-y-0.5",
            TILE_CLASS[status]
          )}
        >
          <div className="text-xs font-medium uppercase tracking-wide opacity-80">
            {STATUS_LABEL[status]}
          </div>
          <div className="mt-1 font-mono text-2xl font-semibold tabular-nums">
            {counts[status]}
          </div>
        </div>
      ))}
    </div>
  );
}
