const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withSiteBasePath(src: string): string {
  if (!src.startsWith("/images/") || !siteBasePath) {
    return src;
  }

  return `${siteBasePath}${src}`;
}
