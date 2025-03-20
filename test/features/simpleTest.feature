Feature: Test API with simple request

  Scenario: Test the API
    Given I send a GET request to the simple test endpoint "https://jsonplaceholder.typicode.com/posts"
    Then the simple test response status should be 200
    And the simple test response time should be below 500ms
    And the simple test response should contain "id" and "title"
