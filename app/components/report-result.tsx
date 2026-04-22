import type { ExtractionResult } from "@/app/types/biomarker";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PatientInfoCard } from "@/app/components/patient-info-card";
import { BiomarkerTable } from "@/app/components/biomarker-table";
import { StatusSummary } from "@/app/components/status-summary";
import { FileText } from "lucide-react";
import { pluralize } from "@/app/lib/format";

interface ReportResultProps {
  result: ExtractionResult;
}

export function ReportResult({ result }: ReportResultProps) {
  if (result.error || !result.data) {
    return (
      <Alert variant="destructive">
        <AlertTitle>{result.fileName}</AlertTitle>
        <AlertDescription>
          {result.error ?? "Failed to extract data from this file."}
        </AlertDescription>
      </Alert>
    );
  }

  const { patient, biomarkers } = result.data;

  return (
    <div className="flex flex-col gap-4 animate-fade-in-up">
      <Card>
        <CardHeader className="flex-row items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="size-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <CardTitle className="text-base">{result.fileName}</CardTitle>
            <CardDescription>
              {biomarkers.length} {pluralize(biomarkers.length, "biomarker")} extracted
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <StatusSummary biomarkers={biomarkers} />
        </CardContent>
      </Card>
      <PatientInfoCard patient={patient} />
      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
          <CardDescription>
            Search, filter by status, and review every biomarker.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <BiomarkerTable biomarkers={biomarkers} />
        </CardContent>
      </Card>
    </div>
  );
}
