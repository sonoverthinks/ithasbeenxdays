export function removeUrls(input: string): string {
  // Regular expression to match URLs
  const urlPattern = /https?:\/\/[^\s/$.?#].[^\s]*/g;

  // Replace all URLs with an empty string
  return input.replace(urlPattern, "");
}

export function cleanParam(input: string): string {
  return input.replace(/%20/g, " ");
}
