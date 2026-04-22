"use client";

import { Search } from "lucide-react";
import { ROW_TINT_CLASS, TABLE_HEADERS } from "@/app/constants/biomarker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/app/components/status-badge";
import { BiomarkerFilterButtons } from "@/app/components/biomarker-filter-buttons";
import { cn } from "@/lib/utils";
import { formatBiomarkerValue } from "@/app/lib/format";
import { useBiomarkerFilter } from "@/app/hooks/use-biomarker-filter";
import type { BiomarkerTableProps } from "@/app/types/ui";

export function BiomarkerTable({ biomarkers }: BiomarkerTableProps) {
  const { query, setQuery, filter, setFilter, filtered } = useBiomarkerFilter(biomarkers);

  if (biomarkers.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No biomarkers were extracted from this report.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search biomarker, unit..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <BiomarkerFilterButtons
          biomarkers={biomarkers}
          filter={filter}
          onFilterChange={setFilter}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {TABLE_HEADERS.map((header) => (
              <TableHead key={header.key} className={header.className}>
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((b, i) => (
            <TableRow
              key={`${b.name}-${i}`}
              className={cn("transition-colors", ROW_TINT_CLASS[b.status])}
            >
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{b.name}</span>
                  {b.original_name && b.original_name !== b.name && (
                    <span className="text-xs text-muted-foreground">
                      {b.original_name}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-mono tabular-nums">
                {formatBiomarkerValue(b)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {b.unit ?? "—"}
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {b.reference_range ?? "—"}
              </TableCell>
              <TableCell>
                <StatusBadge status={b.status} />
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {b.explanation ?? ""}
              </TableCell>
            </TableRow>
          ))}
          {filtered.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="py-8 text-center text-sm text-muted-foreground"
              >
                No biomarkers match your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
