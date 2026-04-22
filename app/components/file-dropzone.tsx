"use client";

import { useRef } from "react";
import { UploadCloud, X, FileText } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import { AcceptedFileType } from "@/app/enums/file-type";
import { MAX_FILES_PER_REQUEST, MAX_FILE_SIZE_BYTES } from "@/app/constants/openai";
import { formatFileSize } from "@/app/lib/format";
import { useFileDropzone } from "@/app/hooks/use-file-dropzone";
import type { FileDropzoneProps } from "@/app/types/ui";

export function FileDropzone({ files, onChange, disabled }: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isDragging, setIsDragging, error, addFiles, removeFile } = useFileDropzone(files, onChange);

  return (
    <div className="flex flex-col gap-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (disabled) return;
          if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
        }}
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          "group/drop relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-12 text-center transition-all duration-200 ease-out",
          "hover:border-primary/60 hover:bg-primary/5 hover:shadow-sm",
          isDragging && "scale-[1.01] border-primary bg-primary/10 shadow-md ring-4 ring-primary/10",
          disabled && "pointer-events-none opacity-60"
        )}
      >
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-200",
            "group-hover/drop:scale-110",
            isDragging && "scale-110 animate-pulse"
          )}
        >
          <UploadCloud className="size-6" />
        </div>
        <div>
          <p className="text-sm font-medium">
            Drop PDF lab reports here or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Up to {MAX_FILES_PER_REQUEST} files, max{" "}
            {formatFileSize(MAX_FILE_SIZE_BYTES)} each
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={AcceptedFileType.PDF}
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}

      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="group/file flex items-center justify-between gap-3 rounded-md border border-border bg-card px-3 py-2 text-sm shadow-sm transition-all duration-150 hover:-translate-y-px hover:border-primary/40 hover:shadow-md animate-fade-in-up"
            >
              <div className="flex min-w-0 items-center gap-2">
                <FileText className="size-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{file.name}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                disabled={disabled}
                aria-label={`Remove ${file.name}`}
              >
                <X />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
