Feature: Sample navigation
  Scenario: Visit example site
    Given I open "https://www.google.com/"
    Then I should see the title contains "Google"
