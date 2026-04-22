import { NextResponse } from "next/server";
import { extractBiomarkersFromPdf } from "@/app/lib/openai/extract-biomarkers";
import type { ExtractionResult } from "@/app/types/biomarker";
import {
  MAX_FILES_PER_REQUEST,
  MAX_FILE_SIZE_BYTES,
} from "@/app/constants/openai";
import { ACCEPTED_MIME_TYPES } from "@/app/enums/file-type";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid multipart form data." },
      { status: 400 }
    );
  }

  const files = formData.getAll("files").filter((v): v is File => v instanceof File);

  if (files.length === 0) {
    return NextResponse.json(
      { error: "No files were provided under the 'files' field." },
      { status: 400 }
    );
  }

  if (files.length > MAX_FILES_PER_REQUEST) {
    return NextResponse.json(
      { error: `Too many files. Max ${MAX_FILES_PER_REQUEST} per request.` },
      { status: 400 }
    );
  }

  const results: ExtractionResult[] = await Promise.all(
    files.map(async (file): Promise<ExtractionResult> => {
      const fileName = file.name || "upload.pdf";
      try {
        if (
          !(ACCEPTED_MIME_TYPES as readonly string[]).includes(file.type) &&
          !fileName.toLowerCase().endsWith(".pdf")
        ) {
          throw new Error("Only PDF files are supported.");
        }
        if (file.size > MAX_FILE_SIZE_BYTES) {
          throw new Error("File exceeds maximum size.");
        }

        const bytes = new Uint8Array(await file.arrayBuffer());
        const data = await extractBiomarkersFromPdf({
          fileName,
          bytes,
          mimeType: file.type || "application/pdf",
        });

        return { fileName, data, error: null };
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unknown extraction error.";
        return { fileName, data: null, error: message };
      }
    })
  );

  return NextResponse.json({ results });
}
