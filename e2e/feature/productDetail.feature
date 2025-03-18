Feature: Product API Tests

  Scenario: Get products in category
    When I send a GET request to "/api/c/kott-chark-och-fagel/palagg?size=30&page=0&sort=price-asc"
    Then the response status should be 200
    And the response should be in JSON format
    And the response should contain an array "results"
    And each item in "results" should contain properties "price", "name", "image", "productLine2"
    And the "image" property should contain "url", "imageType", "format"
    And each "priceValue" should be a number
    And each "name" should be a string
    And each "productLine2" should be a non-empty string
