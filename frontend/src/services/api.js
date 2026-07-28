import { API_BASE_URL } from "../utils/constants";

/**
 * Thin wrapper around the native Fetch API (no axios).
 * Every service module goes through this client.
 */
const buildUrl = (path, params) => {
  const url = new URL(path, API_BASE_URL);
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
};

const parse = async (response) => {
  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      (body && body.error) || (body && body.message) || `Request failed (${response.status})`;
    throw new Error(message);
  }
  return body;
};

export const apiGet = async (path, params, options = {}) => {
  const response = await fetch(buildUrl(path, params), {
    method: "GET",
    headers: { Accept: "application/json" },
    ...options,
  });
  return parse(response);
};

export const apiPost = async (path, payload, options = {}) => {
  const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;
  const response = await fetch(buildUrl(path), {
    method: "POST",
    headers: isFormData ? { Accept: "application/json" } : { "Content-Type": "application/json" },
    body: isFormData ? payload : JSON.stringify(payload ?? {}),
    ...options,
  });
  return parse(response);
};

/**
 * Calls the Flask API and falls back to bundled demo data when the API is
 * unreachable, so the UI stays explorable without a running backend.
 */
export const withFallback = async (request, fallback) => {
  try {
    return await request();
  } catch (error) {
    console.warn("[api] falling back to demo data:", error.message);
    return { ...fallback, demo: true, error: error.message };
  }
};
