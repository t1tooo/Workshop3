// cucumber.js
export default {
  default: {
    require: ['./test/step-definitions/**/*.js'],  // Stegdefinitionerna ligger i test/step-definitions
    format: ['json:./cucumber-report.json'],      // Generera en JSON-rapport
    features: './test/features/**/*.feature',     // Pekar på alla feature-filer
  },
};
