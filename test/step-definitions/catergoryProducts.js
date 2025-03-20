import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import fetch from 'node-fetch';

let response;
let jsonResponse;
let responseTime;

const BASE_URL = "http://localhost:5173/api/leftMenu/categorytree";

Given('the API endpoint for category tree is available', function () {
  this.apiUrl = BASE_URL; // Store the URL for later use
});

When('I send a request to the category tree API', async function () {
  const startTime = Date.now();
  try {
    response = await fetch(this.apiUrl);
    responseTime = Date.now() - startTime;
    jsonResponse = await response.json(); // Store the JSON response once
  } catch (error) {
    console.error("Error fetching category tree:", error.message);
  }
});

Then('the status code should be {int}', function (expectedStatus) {
  expect(response.status).to.equal(expectedStatus);
});

Then('the response should be in JSON format', function () {
  // Check if 'content-type' exists in the headers and contains 'application/json'
  const contentType = response.headers.get('content-type');
  expect(contentType).to.include('application/json');
});

Then('the response should contain {string} array', function (property) {
  expect(jsonResponse).to.have.property(property);
  expect(jsonResponse[property]).to.be.an('array');
});

Then('each item in {string} should contain required properties', function (property) {
  jsonResponse[property].forEach(item => {
    expect(item).to.have.property('id');
    expect(item).to.have.property('category');
    expect(item).to.have.property('title');
    expect(item).to.have.property('url');
  });
});

Then('the response time should be less than {int} ms', function (maxTime) {
  expect(responseTime).to.be.lessThan(maxTime);
});
