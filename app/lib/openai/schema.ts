import { BIOMARKER_STATUS_VALUES } from "@/app/enums/biomarker-status";
import { SEX_VALUES } from "@/app/enums/sex";

/**
 * JSON Schema passed to OpenAI Responses API so the model returns
 * a strict, typed LabReportExtraction object.
 */
export const labReportJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["patient", "biomarkers"],
  properties: {
    patient: {
      type: "object",
      additionalProperties: false,
      required: [
        "name",
        "age",
        "sex",
        "collection_date",
        "report_date",
        "notes",
      ],
      properties: {
        name: { type: ["string", "null"] },
        age: { type: ["integer", "null"], minimum: 0, maximum: 130 },
        sex: { type: "string", enum: [...SEX_VALUES] },
        collection_date: { type: ["string", "null"] },
        report_date: { type: ["string", "null"] },
        notes: { type: ["string", "null"] },
      },
    },
    biomarkers: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "name",
          "original_name",
          "value",
          "value_text",
          "unit",
          "reference_range",
          "reference_low",
          "reference_high",
          "status",
          "explanation",
        ],
        properties: {
          name: { type: "string" },
          original_name: { type: ["string", "null"] },
          value: { type: ["number", "null"] },
          value_text: { type: ["string", "null"] },
          unit: { type: ["string", "null"] },
          reference_range: { type: ["string", "null"] },
          reference_low: { type: ["number", "null"] },
          reference_high: { type: ["number", "null"] },
          status: { type: "string", enum: [...BIOMARKER_STATUS_VALUES] },
          explanation: { type: ["string", "null"] },
        },
      },
    },
  },
} as const;
