import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  cacheComponents: true,
  experimental: {
    // babel-plugin-react-compiler を入れずに React Compiler を動かすため
    // https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopackRustReactCompiler
    turbopackRustReactCompiler: true,
  },
  // JS を許すときは、tsconfig.json の allowJs も合わせる
  pageExtensions: ["tsx", "ts"],
  partialPrefetching: true,
  poweredByHeader: false,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        as: "*.css",
        loaders: ["@tailwindcss/turbopack"],
      },
    },
  },
  typedRoutes: true,
};

export default nextConfig;
