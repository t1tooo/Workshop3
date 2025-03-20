Feature: Verify product details API

  Scenario: Verify product details response
    Given the API endpoint for product details is available
    When I send a request to the product details API
    Then the product details status code should be 200
    And the product details response time should be less than 500 ms
    And the product details response should contain "ean"
    And the product details response should contain "name"
    And the product details response should contain "price"
