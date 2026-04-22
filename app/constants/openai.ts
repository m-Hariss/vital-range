export const OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

export const OPENAI_RESPONSE_FORMAT_NAME = "lab_report_extraction";

export const OPENAI_TEMPERATURE = 0;

export const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB

export const MAX_FILES_PER_REQUEST = 10;
