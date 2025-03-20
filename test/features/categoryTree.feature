Feature: Category Tree API

  Scenario: Verify category tree API response structure and performance
    When I send a GET request to the category tree endpoint
    Then the category tree response status should be 200
    And the category tree response time should be below 500ms
    And the category tree response should contain "id" and "category"
    And the category tree response should contain a "children" array
    And each child in the category tree should have "id", "category", "title", and "url"
    And the category tree should have a "valid" property that is true
