import { defineConfig } from 'cypress';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import esbuild from 'esbuild';

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // Add the Cucumber preprocessor plugin
      await addCucumberPreprocessorPlugin(on, config);

      // Define a file preprocessor that uses esbuild to handle .feature files
      on('file:preprocessor', async (file) => {
        if (file.extname === '.feature') {
          // Process .feature files with esbuild
          return esbuild.buildSync({
            entryPoints: [file.filePath],
            bundle: true,
            platform: 'node',
            target: 'esnext',
            format: 'cjs',
            outfile: 'out.js',
          }).outputFiles[0].text;
        }
        return file;
      });

      return config;
    },
    specPattern: 'e2e/feature/**/*.feature',  // Match .feature files in the correct directory
    supportFile: 'e2e/feature/support/index.js',  // Specify the correct path for the support file
  },
});
