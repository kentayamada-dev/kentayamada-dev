import tailwindcss from "@tailwindcss/vite";
import type { AstroUserConfig } from "astro";
import { defineConfig } from "astro/config";

const config: AstroUserConfig = defineConfig({
  server: {
    // 既定の localhost はコンテナ内で ::1 に解決されるが、VS Code のポート転送は IPv6 に対応せず届かないため、IPv4 で待ち受ける
    // https://github.com/vitejs/vite/blob/v8.3.8/docs/guide/troubleshooting.md#dev-containers--vs-code-port-forwarding
    host: "127.0.0.1",
  },
  vite: {
    // ベンダープレフィックスは、Astro の既定のビルドでは足されず、Tailwind だけが足す。Tailwind の機能を使わない CSS には足されないので、スタイルは Tailwind で書く
    // https://github.com/tailwindlabs/tailwindcss/blob/v4.3.5/packages/@tailwindcss-vite/src/index.ts#L442-L453
    plugins: [tailwindcss()],
  },
});

export default config;
