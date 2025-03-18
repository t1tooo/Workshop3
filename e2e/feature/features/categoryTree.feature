Feature: Category Tree API Test

  Scenario: Fetch category tree
    When I send a GET request to "/api/leftMenu/categorytree"
    Then the response status should be 200
    And the response time should be below 500ms
    And the response should contain "id" and "category"
    And the response should contain an array "children"
    And each child should have "id", "category", "title", and "url"
    And the response should have "valid" as true
