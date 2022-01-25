export const checkNullObj = (obj: object): boolean => {
  if (obj == null) return false;
  return Object.keys(obj).length === 0;
};
