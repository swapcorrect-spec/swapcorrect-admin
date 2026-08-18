type BuildCspOptions = {
  isDev: boolean;
  apiBaseUrl?: string;
};

const normalizeOrigin = (url?: string): string | null => {
  if (!url?.trim()) return null;

  try {
    return new URL(url.trim()).origin;
  } catch {
    return null;
  }
};

export const buildContentSecurityPolicy = ({
  isDev,
  apiBaseUrl,
}: BuildCspOptions): string => {
  const apiOrigin = normalizeOrigin(apiBaseUrl);

  const connectSrc = ["'self'"];
  if (apiOrigin) connectSrc.push(apiOrigin);
  if (isDev) {
    connectSrc.push(
      "ws:",
      "wss:",
      "http://localhost:*",
      "https://localhost:*",
      "http://127.0.0.1:*",
      "https://127.0.0.1:*",
    );
  }

  const scriptSrc = isDev
    ? ["'self'", "'unsafe-inline'", "'unsafe-eval'"]
    : ["'self'"];

  const directives: Array<[string, string[]]> = [
    ["default-src", ["'self'"]],
    ["base-uri", ["'self'"]],
    ["form-action", ["'self'"]],
    ["frame-ancestors", ["'none'"]],
    ["object-src", ["'none'"]],
    ["script-src", scriptSrc],
    ["style-src", ["'self'", "'unsafe-inline'"]],
    ["img-src", ["'self'", "data:", "blob:", "https:"]],
    ["font-src", ["'self'", "data:"]],
    ["connect-src", connectSrc],
    ["worker-src", ["'self'", "blob:"]],
    ["manifest-src", ["'self'"]],
  ];

  if (!isDev) {
    directives.push(["upgrade-insecure-requests", []]);
  }

  return directives
    .map(([name, values]) =>
      values.length > 0 ? `${name} ${values.join(" ")}` : name,
    )
    .join("; ");
};

export const securityHeaders = (csp: string): Record<string, string> => ({
  "Content-Security-Policy": csp,
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
});

export const buildNetlifyHeadersFile = (csp: string): string => `/*
  Content-Security-Policy: ${csp}
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
`;
