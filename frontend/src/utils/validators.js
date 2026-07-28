import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "./constants";

export const isAllowedType = (file) =>
  Boolean(file) && Object.keys(ACCEPTED_FILE_TYPES).includes(file.type);

export const isAllowedSize = (file) => Boolean(file) && file.size <= MAX_FILE_SIZE;

export const validateResumeFile = (file) => {
  if (!file) return { valid: false, error: "No file selected." };
  if (!isAllowedType(file)) return { valid: false, error: "Only PDF, DOCX or TXT files are supported." };
  if (!isAllowedSize(file)) return { valid: false, error: "File is larger than 5 MB." };
  return { valid: true, error: null };
};

export const isPositiveInt = (value) => Number.isInteger(Number(value)) && Number(value) > 0;
