Feature: Sample navigation
  Scenario: Visit example site
    Given I open "google"
    Then I should see the title contains "Google"

  Scenario: Search for a term
    Given I open "google"
    When I search for "Playwright"
    Then I should see search results
