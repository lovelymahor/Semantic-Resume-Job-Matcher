export const getFileExtension = (name = "") => name.split(".").pop()?.toUpperCase() || "";

export const fileIconLabel = (file) => (file ? getFileExtension(file.name) : "FILE");

export const toFormData = (file, extra = {}) => {
  const formData = new FormData();
  formData.append("resume", file);
  Object.entries(extra).forEach(([key, value]) => formData.append(key, value));
  return formData;
};

export const readTextFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Unable to read file."));
    reader.readAsText(file);
  });
