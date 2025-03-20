import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import fetch from 'node-fetch';

let response;
let jsonResponse;
let responseTime;

const BASE_URL = "http://localhost:5173/api/leftMenu/categorytree";

When("I send a GET request to the category tree endpoint", async function () {
  const startTime = Date.now();

  try {
    response = await fetch(BASE_URL);
    responseTime = Date.now() - startTime;
    jsonResponse = await response.json(); // ✅ Store the JSON response once
  } catch (error) {
    console.error("Error fetching category tree:", error.message);
  }
});

Then("the category tree response status should be 200", function () {
  expect(response.status).to.equal(200);
});

Then("the category tree response time should be below 500ms", function () {
  expect(responseTime).to.be.below(500);
});

Then("the category tree response should contain {string} and {string}", function (id, category) {
  expect(jsonResponse).to.have.property(id);
  expect(jsonResponse).to.have.property(category);
});

Then("the category tree response should contain a {string} array", function (children) {
  expect(jsonResponse).to.have.property(children).that.is.an("array");
});

Then("each child in the category tree should have {string}, {string}, {string}, and {string}", function (id, category, title, url) {
  jsonResponse.children.forEach(child => {
    expect(child).to.have.property(id);
    expect(child).to.have.property(category);
    expect(child).to.have.property(title);
    expect(child).to.have.property(url);
  });
});

Then("the category tree should have a {string} property that is true", function (valid) {
  expect(jsonResponse).to.have.property(valid).that.is.true;
});
