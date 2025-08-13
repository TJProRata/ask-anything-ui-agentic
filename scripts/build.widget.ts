import { readFileSync, mkdirSync, copyFileSync } from "node:fs";
import { join } from "node:path";
import { transform } from "lightningcss";

// Use the widget initializer as the IIFE entrypoint
const ENTRY_POINT = "scripts/initialize.widget.ts";
// Output under Next.js public/ so it can be served at /dist/widget.js in dev/demo
const OUTPUT_DIR = "public/dist";

const result = await Bun.build({
  entrypoints: [ENTRY_POINT],
  outdir: OUTPUT_DIR,
  target: "browser",
  format: "iife",
  naming: {
    entry: "widget.[hash].js",
    chunk: "chunk.[hash].js",
    asset: "assets/[name].[hash].[ext]"
  },
  minify: true,
  sourcemap: "external",
  external: [],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    // Provide lightweight shims for browser bundle to avoid ReferenceError
    "process.env": JSON.stringify({}),
    "process": "({ env: {} })",
    "global": "globalThis"
  },
  loader: {
    ".tsx": "tsx",
    ".ts": "ts",
    ".css": "css"
  },
  plugins: [
    {
      name: "tailwind-transformer",
      setup(build) {
        build.onLoad({ filter: /\.css$/ }, async (args) => {
          const css = readFileSync(args.path, "utf8");
          // Transform Tailwind CSS v4 with Lightning CSS
          const { code } = transform({
            filename: args.path,
            code: Buffer.from(css),
            minify: true,
            targets: {
              chrome: 80,
              firefox: 80,
              safari: 13
            }
          });
          return {
            contents: code.toString(),
            loader: "css"
          };
        });
      }
    }
  ]
});

// Create a stable copy at public/dist/widget.js for demo consumption
try {
  const jsOutputs = result.outputs.filter((o) => o.path.endsWith(".js"));
  const entryOutput = jsOutputs.find((o) => o.path.includes("widget.")) || jsOutputs[0];
  if (entryOutput) {
    const stableDir = OUTPUT_DIR;
    mkdirSync(stableDir, { recursive: true });
    const stablePath = join(stableDir, "widget.js");
    copyFileSync(entryOutput.path, stablePath);
    console.log(`[build.widget] Copied ${entryOutput.path} -> ${stablePath}`);
  }
} catch (e) {
  console.warn("[build.widget] Failed to create stable widget.js copy:", e);
}

console.log(`[build.widget] Widget built successfully: ${result.outputs.length} files generated`);