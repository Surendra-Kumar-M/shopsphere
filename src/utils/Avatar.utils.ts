export const getInitials = (name?: string) => {
  if (!name) return "?";

  return name
    .trim()
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};
