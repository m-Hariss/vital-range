import {
  ACCEPTED_EXTENSIONS,
  ACCEPTED_MIME_TYPES,
} from "@/app/enums/file-type";

export function isAcceptedFile(file: File): boolean {
  if ((ACCEPTED_MIME_TYPES as readonly string[]).includes(file.type)) {
    return true;
  }
  const lower = file.name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}
