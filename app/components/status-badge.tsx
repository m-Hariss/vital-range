import { BiomarkerStatus } from "@/app/enums/biomarker-status";
import { STATUS_BADGE_CLASS, STATUS_LABEL, STATUS_DOT_CLASS } from "@/app/constants/biomarker";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { StatusBadgeProps } from "@/app/types/ui";

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      className={cn(
        "ring-1 ring-inset ring-black/5 dark:ring-white/10",
        STATUS_BADGE_CLASS[status],
        className
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          STATUS_DOT_CLASS[status],
          status === BiomarkerStatus.OUT_OF_RANGE && "animate-pulse"
        )}
        aria-hidden
      />
      {STATUS_LABEL[status]}
    </Badge>
  );
}
