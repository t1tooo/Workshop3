import '@badeball/cypress-cucumber-preprocessor/support';

// You can add global hooks or custom commands here
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevents Cypress from failing the test on uncaught exceptions
  return false;
});
