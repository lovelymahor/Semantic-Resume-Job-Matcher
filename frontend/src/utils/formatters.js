export const formatPercent = (value, digits = 1) =>
  `${((Number(value) || 0) * 100).toFixed(digits)}%`;

export const formatScore = (value, digits = 3) => (Number(value) || 0).toFixed(digits);

export const formatBytes = (bytes = 0) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
};

export const formatMs = (ms = 0) => (ms < 1000 ? `${ms} ms` : `${(ms / 1000).toFixed(2)} s`);

export const formatDate = (value) => {
  const date = value ? new Date(value) : new Date();
  return date.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatRank = (rank) => `#${rank}`;
