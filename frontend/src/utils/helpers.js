export const cn = (...classes) => classes.filter(Boolean).join(" ");

export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const scoreTone = (score) => {
  if (score >= 0.85) return "success";
  if (score >= 0.7) return "primary";
  if (score >= 0.55) return "warning";
  return "muted";
};

export const uniq = (list = []) => Array.from(new Set(list));

export const truncate = (text = "", length = 160) =>
  text.length > length ? `${text.slice(0, length).trimEnd()}…` : text;

export const sortByScore = (items = []) =>
  [...items].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
