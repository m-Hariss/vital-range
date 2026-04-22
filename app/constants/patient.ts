import { Sex } from "@/app/enums/sex";

export const SEX_DISPLAY: Record<Sex, string> = {
  [Sex.MALE]: "Male",
  [Sex.FEMALE]: "Female",
  [Sex.OTHER]: "Other",
  [Sex.UNKNOWN]: "—",
};
