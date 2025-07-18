export const trimToLength = (str: string, length = 80) => {
  if (typeof str !== "string") return "";
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};
