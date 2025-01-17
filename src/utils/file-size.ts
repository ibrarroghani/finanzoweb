export const fileSizeCheck = (size: number): boolean => {
  const maxSize = 5 * 1024 * 1024;
  if (size > maxSize) {
    return true;
  }
  return false;
};
