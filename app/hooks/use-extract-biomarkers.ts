import { useState } from "react";
import { UploadState } from "@/app/enums/upload-state";
import type { ExtractionResult } from "@/app/types/biomarker";
import { useApiFetch } from "./use-api-fetch";
import { API_ROUTES } from "@/app/constants/api-routes";
import { HttpMethod } from "@/app/enums/http-method";

export function useExtractBiomarkers() {
  const [state, setState] = useState<UploadState>(UploadState.IDLE);
  const [results, setResults] = useState<ExtractionResult[]>([]);
  const { fetchApi, isLoading, error } = useApiFetch<{ results: ExtractionResult[] } | { error: string }>();

  const extract = async (files: File[]) => {
    if (files.length === 0 || isLoading) return;

    setState(UploadState.UPLOADING);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    setState(UploadState.PROCESSING);

    const response = await fetchApi(
      API_ROUTES.EXTRACT,
      {
        method: HttpMethod.POST,
        body: formData,
      },
      {
        onSuccess: (data) => {
          if ("results" in data) {
            setResults(data.results);
            setState(UploadState.SUCCESS);
          }
        },
        onError: (errorMessage) => {
          setState(UploadState.ERROR);
        },
      }
    );
  };

  const reset = () => {
    setResults([]);
    setState(UploadState.IDLE);
  };

  const isBusy = state === UploadState.UPLOADING || state === UploadState.PROCESSING;

  return {
    extract,
    reset,
    state,
    results,
    isLoading,
    error,
    isBusy,
  };
}
