export const getQueryParams = (params: Record<string, any>): string => {
  for (const [key, value] of Object.entries(params)) {
    if (
      value === undefined ||
      value === null ||
      (Array.isArray(value) && !value.length)
    ) {
      delete params[key];
    }
  }

  return new URLSearchParams(params).toString();
};
