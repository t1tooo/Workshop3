import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import fetch from 'node-fetch';

let response;
let jsonResponse;
let responseTime;

const BASE_URL = "http://localhost:5173/api/axfood/rest/p/101290312_ST";


Given('the API endpoint for product details is available', function () {
  console.log(`Trying to access the API endpoint for product details: ${BASE_URL}`);
});

When("I send a request to the product details API", async function () {
  const startTime = Date.now();

  try {
    response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${BASE_URL}, status code: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error fetching product details from ${BASE_URL}: ${error.message}`);
    console.log(`Switching to fallback API at ${FALLBACK_URL}`);
    response = await fetch(FALLBACK_URL);
  }

  responseTime = Date.now() - startTime; // Calculate response time

  if (response.ok) {
    jsonResponse = await response.json(); // Store the JSON response
    console.log("Received JSON Response:", jsonResponse); // Debugging: Log response
  } else {
    console.error(`Failed to fetch from fallback API. Status: ${response.status}`);
  }
});

Then("the product details status code should be 200", function () {
  if (response) {
    expect(response.status).to.equal(200);
  } else {
    throw new Error('Response is undefined, cannot check status code');
  }
});

Then("the product details response time should be less than 500 ms", function () {
  expect(responseTime).to.be.below(500);
});

Then("the product details response should contain {string}", function (property) {
  if (jsonResponse) {
    console.log(`Checking if response contains: ${property}`);
    expect(jsonResponse).to.have.property(property);
  } else {
    throw new Error("Response is null or undefined");
  }
});
