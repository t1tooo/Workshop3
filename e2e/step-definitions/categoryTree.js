import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const { expect } = chai;

let response;

When('I send a GET request to {string}', async (endpoint) => {
  const startTime = Date.now();
  response = await fetch(endpoint);
  response.time = Date.now() - startTime; // Capture response time
});

Then('the response status should be {int}', (statusCode) => {
  expect(response.status).to.equal(statusCode);
});

Then('the response time should be below {int}ms', (maxTime) => {
  expect(response.time).to.be.lessThan(maxTime);
});

Then('the response should contain {string} and {string}', async (key1, key2) => {
  const jsonResponse = await response.json();
  expect(jsonResponse).to.have.property(key1);
  expect(jsonResponse).to.have.property(key2);
});

Then('the response should contain an array {string}', async (key) => {
  const jsonResponse = await response.json();
  expect(jsonResponse).to.have.property(key).that.is.an('array');
});

Then('each child should have {string}, {string}, {string}, and {string}', async (id, category, title, url) => {
  const jsonResponse = await response.json();
  jsonResponse.children.forEach(child => {
    expect(child).to.have.property(id);
    expect(child).to.have.property(category);
    expect(child).to.have.property(title);
    expect(child).to.have.property(url);
  });
});

Then('the response should have {string} as true', async (key) => {
  const jsonResponse = await response.json();
  expect(jsonResponse).to.have.property(key, true);
});