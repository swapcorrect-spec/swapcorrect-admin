import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";
import {
  buildContentSecurityPolicy,
  buildNetlifyHeadersFile,
  securityHeaders,
} from "./csp.config";

type SecurityHeadersPluginOptions = {
  isDev: boolean;
  apiBaseUrl?: string;
};

export const securityHeadersPlugin = ({
  isDev,
  apiBaseUrl,
}: SecurityHeadersPluginOptions): Plugin => {
  const csp = buildContentSecurityPolicy({ isDev, apiBaseUrl });
  const headers = securityHeaders(csp);

  return {
    name: "swapshop-security-headers",
    transformIndexHtml(html) {
      const cspMeta = `<meta http-equiv="Content-Security-Policy" content="${csp}" />`;

      if (html.includes('http-equiv="Content-Security-Policy"')) {
        return html;
      }

      return html.replace("<head>", `<head>\n    ${cspMeta}`);
    },
    closeBundle() {
      if (isDev) return;

      const outDir = resolve(process.cwd(), "dist");
      writeFileSync(
        resolve(outDir, "_headers"),
        buildNetlifyHeadersFile(csp),
        "utf8",
      );
      writeFileSync(
        resolve(outDir, "vercel.json"),
        JSON.stringify(
          {
            headers: [
              {
                source: "/(.*)",
                headers: Object.entries(headers).map(([key, value]) => ({
                  key,
                  value,
                })),
              },
            ],
          },
          null,
          2,
        ),
        "utf8",
      );
    },
  };
};
