// @vitest-environment node

import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("studio setup paths", () => {
  it("resolves settings path under Asta_STATE_DIR when set", async () => {
    const { resolveStudioSettingsPath } = await import("../../server/studio-settings");
    const settingsPath = resolveStudioSettingsPath({
      Asta_STATE_DIR: "/tmp/Asta-state",
    } as unknown as NodeJS.ProcessEnv);
    expect(settingsPath).toBe(
      path.join(path.resolve("/tmp/Asta-state"), "asta", "settings.json")
    );
  });

  it("resolves settings path under ~/.Asta by default", async () => {
    const { resolveStudioSettingsPath } = await import("../../server/studio-settings");
    const settingsPath = resolveStudioSettingsPath({} as NodeJS.ProcessEnv);
    expect(settingsPath).toBe(
      path.join(os.homedir(), ".Asta", "asta", "settings.json")
    );
  });
});
