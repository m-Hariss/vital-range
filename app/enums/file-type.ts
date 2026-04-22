export enum AcceptedFileType {
  PDF = "application/pdf",
}

export const ACCEPTED_MIME_TYPES = [AcceptedFileType.PDF] as const;
export const ACCEPTED_EXTENSIONS = [".pdf"] as const;
