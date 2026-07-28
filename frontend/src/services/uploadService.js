import { apiPost } from "./api";
import { API_ENDPOINTS } from "../utils/constants";
import { toFormData } from "../utils/fileUtils";

/** POST /api/upload — sends the resume file for parsing + cleaning. */
export const uploadResume = (file, extra) => apiPost(API_ENDPOINTS.upload, toFormData(file, extra));
