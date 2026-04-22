"use client";

import { useState } from "react";
import { Activity, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/app/components/file-dropzone";
import { ReportResult } from "@/app/components/report-result";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FEATURES } from "@/app/constants/features";
import { useExtractBiomarkers } from "@/app/hooks/use-extract-biomarkers";
import { UploadState } from "@/app/enums/upload-state";
import { pluralize } from "@/app/lib/format";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const { extract, reset, state, results, error, isBusy } = useExtractBiomarkers();

  async function handleSubmit() {
    await extract(files);
  }

  function handleReset() {
    setFiles([]);
    reset();
  }

  return (
    <div className="relative flex flex-1 flex-col">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-radial-fade"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-40 mask-[radial-gradient(ellipse_at_top,black_30%,transparent_70%)]"
      />

      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm shadow-primary/30">
              <Activity className="size-4" />
            </div>
            <span className="text-base font-semibold tracking-tight">
              VitalRange
            </span>
            <span className="hidden text-sm text-muted-foreground sm:inline">
              Lab report biomarker extraction
            </span>
          </div>
          <a
            href="https://platform.openai.com/docs"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Powered by OpenAI
          </a>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-10">
        <section className="flex flex-col items-start gap-4 animate-fade-in-up">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3" />
            AI-powered biomarker analysis
          </span>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Turn PDF lab reports into{" "}
            <span className="bg-linear-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
              structured biomarkers
            </span>
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Upload one or more lab report PDFs. We extract every biomarker,
            standardize names and units, and classify each result based on the
            patient&apos;s age and sex.
          </p>
        </section>

        <section className="grid gap-3 sm:grid-cols-3 animate-fade-in-up">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="mb-2 flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-110">
                <Icon className="size-4" />
              </div>
              <div className="text-sm font-semibold">{title}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{desc}</div>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-5 rounded-2xl border border-border bg-card/90 p-6 shadow-sm backdrop-blur animate-fade-in-up">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold tracking-tight">
              Upload lab reports
            </h2>
            <p className="text-sm text-muted-foreground">
              PDF only. Drag &amp; drop multiple files at once.
            </p>
          </div>

          <FileDropzone
            files={files}
            onChange={setFiles}
            disabled={isBusy}
          />

          <div className="flex items-center gap-3">
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={files.length === 0 || isBusy}
            >
              {isBusy ? (
                <>
                  <Loader2 className="animate-spin" />
                  {state === UploadState.UPLOADING
                    ? "Uploading..."
                    : "Analyzing..."}
                </>
              ) : (
                <>
                  <Sparkles />
                  Extract biomarkers
                </>
              )}
            </Button>
            {(files.length > 0 || results.length > 0) && (
              <Button
                variant="ghost"
                size="lg"
                onClick={handleReset}
                disabled={isBusy}
              >
                Reset
              </Button>
            )}
            {files.length > 0 && !isBusy && (
              <span className="text-xs text-muted-foreground">
                {files.length} {pluralize(files.length, "file")} ready
              </span>
            )}
          </div>
        </section>

        {error && (
          <Alert variant="destructive" className="animate-fade-in-up">
            <AlertTitle>Request failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {results.length > 0 && (
          <section className="flex flex-col gap-10">
            {results.map((result, i) => (
              <ReportResult key={`${result.fileName}-${i}`} result={result} />
            ))}
          </section>
        )}
      </main>

      <footer className="mx-auto w-full max-w-5xl px-6 py-8 text-xs text-muted-foreground">
        VitalRange is for informational purposes only and is not a substitute
        for professional medical advice.
      </footer>
    </div>
  );
}
