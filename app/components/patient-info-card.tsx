import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SEX_DISPLAY } from "@/app/constants/patient";
import type { PatientInfoCardProps, InfoRowProps } from "@/app/types/ui";

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

export function PatientInfoCard({ patient }: PatientInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <InfoRow label="Name" value={patient.name ?? "—"} />
        <InfoRow
          label="Age"
          value={patient.age != null ? `${patient.age} yrs` : "—"}
        />
        <InfoRow label="Sex" value={SEX_DISPLAY[patient.sex] ?? "—"} />
        <InfoRow label="Collected" value={patient.collection_date ?? "—"} />
        {patient.notes && (
          <div className="col-span-full text-xs text-muted-foreground">
            {patient.notes}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
