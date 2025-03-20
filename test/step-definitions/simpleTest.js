import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import fetch from 'node-fetch';

let response;
let responseTime;

When('I send a GET request to the simple test endpoint {string}', async (url) => {
  console.log(`Sending GET request to: ${url}`);

  const startTime = Date.now(); // Capture the start time before making the request
  response = await fetch(url);
  const endTime = Date.now(); // Capture the end time after receiving the response

  responseTime = endTime - startTime; // Calculate the response time
});

Then('the simple test response status should be {int}', (statusCode) => {
  console.log(`Expected status code: ${statusCode}, Actual: ${response.status}`);
  expect(response.status).to.equal(statusCode);
});

Then('the simple test response time should be below {int}ms', (maxTime) => {
  console.log(`Response time: ${responseTime}ms`);
  expect(responseTime).to.be.lessThan(maxTime);
});

Then('the simple test response should contain {string} and {string}', async (key1, key2) => {
  const jsonResponse = await response.json();

  // Check if each object in the array contains the properties `key1` and `key2`
  jsonResponse.forEach(item => {
    expect(item).to.have.property(key1);
    expect(item).to.have.property(key2);
  });
});
