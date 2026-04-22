import "server-only";
import {
  OPENAI_MODEL,
  OPENAI_RESPONSE_FORMAT_NAME,
  OPENAI_TEMPERATURE,
} from "@/app/constants/openai";
import { LAB_REPORT_SYSTEM_PROMPT } from "@/app/constants/prompts";
import type { LabReportExtraction } from "@/app/types/biomarker";
import { getOpenAIClient } from "./client";
import { labReportJsonSchema } from "./schema";

export interface ExtractBiomarkersInput {
  /** Original filename (used in the input_file payload). */
  fileName: string;
  /** Raw PDF bytes. */
  bytes: Uint8Array;
  /** MIME type, e.g. application/pdf */
  mimeType: string;
}

/**
 * Reusable OpenAI call: sends a PDF to the Responses API with a strict
 * JSON Schema and returns a typed `LabReportExtraction` object.
 */
export async function extractBiomarkersFromPdf(
  input: ExtractBiomarkersInput
): Promise<LabReportExtraction> {
  const client = getOpenAIClient();

  const base64 = Buffer.from(input.bytes).toString("base64");
  const dataUrl = `data:${input.mimeType};base64,${base64}`;

  const response = await client.responses.create({
    model: OPENAI_MODEL,
    temperature: OPENAI_TEMPERATURE,
    input: [
      {
        role: "system",
        content: [{ type: "input_text", text: LAB_REPORT_SYSTEM_PROMPT }],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Extract every biomarker from this lab report. File: ${input.fileName}`,
          },
          {
            type: "input_file",
            filename: input.fileName,
            file_data: dataUrl,
          },
        ],
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: OPENAI_RESPONSE_FORMAT_NAME,
        schema: labReportJsonSchema,
        strict: true,
      },
    },
  });

  const raw = response.output_text;
  if (!raw) {
    throw new Error("OpenAI returned an empty response.");
  }

  try {
    return JSON.parse(raw) as LabReportExtraction;
  } catch {
    throw new Error("OpenAI response was not valid JSON.");
  }
}
