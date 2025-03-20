Feature: Category Tree API Response Validation

  Scenario: Verify Category Tree API response
    Given the API endpoint for category tree is available
    When I send a request to the category tree API
    Then the status code should be 200
    Then the response should be in JSON format
    Then the response should contain "children" array
    Then each item in "children" should contain required properties
    Then the response time should be less than 500 ms
