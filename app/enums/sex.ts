export enum Sex {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
  UNKNOWN = "unknown",
}

export const SEX_VALUES = [Sex.MALE, Sex.FEMALE, Sex.OTHER, Sex.UNKNOWN] as const;
