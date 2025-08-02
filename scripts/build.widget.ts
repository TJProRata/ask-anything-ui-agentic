import { readFileSync } from "node:fs";
import { transform } from "lightningcss";

// TODO: Modify ENTRY_POINT as needed
const ENTRY_POINT = "components/widgets/floating-widget/floating-widget.tsx";
const OUTPUT_DIR = "dist";

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
    "process.env.NODE_ENV": JSON.stringify("production")
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

console.log(`[build.widget] Widget built successfully: ${result.outputs.length} files generated`);