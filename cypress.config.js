import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import esbuild from "esbuild"; // Import esbuild directly

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on("file:preprocessor", async (file) => {
        return esbuild.buildSync({
          entryPoints: [file.filePath],
          bundle: true,
          platform: "node",
          target: "esnext",
          format: "cjs",
          outfile: "out.js",
        }).outputFiles[0].text;
      });

      return config;
    },
    specPattern: "e2e/feature/features/*.feature",
    supportFile: "e2e/feature/support/index.js",
  },
});
