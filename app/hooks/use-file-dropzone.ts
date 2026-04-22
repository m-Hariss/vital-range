import { useCallback, useState } from "react";
import { isAcceptedFile } from "@/app/lib/file-validation";
import { formatFileSize } from "@/app/lib/format";
import { MAX_FILES_PER_REQUEST, MAX_FILE_SIZE_BYTES } from "@/app/constants/openai";

export function useFileDropzone(files: File[], onChange: (files: File[]) => void) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      setError(null);
      const accepted: File[] = [];
      const rejected: string[] = [];

      Array.from(incoming).forEach((file) => {
        if (!isAcceptedFile(file)) {
          rejected.push(`${file.name} (unsupported type)`);
          return;
        }
        if (file.size > MAX_FILE_SIZE_BYTES) {
          rejected.push(`${file.name} (exceeds ${formatFileSize(MAX_FILE_SIZE_BYTES)})`);
          return;
        }
        accepted.push(file);
      });

      const merged = [...files, ...accepted].slice(0, MAX_FILES_PER_REQUEST);
      onChange(merged);

      if (rejected.length > 0) {
        setError(`Skipped: ${rejected.join(", ")}`);
      } else if (files.length + accepted.length > MAX_FILES_PER_REQUEST) {
        setError(`Only the first ${MAX_FILES_PER_REQUEST} files were kept.`);
      }
    },
    [files, onChange]
  );

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return {
    isDragging,
    setIsDragging,
    error,
    addFiles,
    removeFile,
  };
}
