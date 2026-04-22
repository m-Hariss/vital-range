import { useMemo, useState } from "react";
import type { Biomarker } from "@/app/types/biomarker";
import type { BiomarkerStatus } from "@/app/enums/biomarker-status";
import { FILTER_ALL } from "@/app/constants/biomarker";

export function useBiomarkerFilter(biomarkers: Biomarker[]) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<BiomarkerStatus | typeof FILTER_ALL>(FILTER_ALL);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return biomarkers.filter((b) => {
      if (filter !== FILTER_ALL && b.status !== filter) return false;
      if (!q) return true;
      return (
        b.name.toLowerCase().includes(q) ||
        (b.original_name?.toLowerCase().includes(q) ?? false) ||
        (b.unit?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [biomarkers, query, filter]);

  return {
    query,
    setQuery,
    filter,
    setFilter,
    filtered,
  };
}
