import { spawnSync } from "node:child_process";
import path from "node:path";

const nextCli = path.join("node_modules", "next", "dist", "bin", "next");
const result = spawnSync(process.execPath, [nextCli, "build"], {
  env: {
    ...process.env,
    GITHUB_PAGES_BUILD: "true",
  },
  stdio: "inherit",
});

if (result.error) {
  console.error(result.error);
}

process.exit(result.status ?? 1);
