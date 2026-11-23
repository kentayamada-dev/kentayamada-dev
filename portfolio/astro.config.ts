import type { AstroUserConfig } from "astro";
import { defineConfig } from "astro/config";

const config: AstroUserConfig = defineConfig({
  server: {
    // 既定の localhost はコンテナ内で ::1 に解決されるが、VS Code のポート転送は IPv6 に対応せず届かないため、IPv4 で待ち受ける
    // https://github.com/vitejs/vite/blob/v8.3.8/docs/guide/troubleshooting.md#dev-containers--vs-code-port-forwarding
    host: "127.0.0.1",
  },
});

export default config;
