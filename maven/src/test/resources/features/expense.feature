Feature: Apply Expense
    Background:
        Given I am on the login page     
        And I fill in the email as "superman@dailyplanet.com"     
        And I fill in the password as "epassword"     
        When I click on the login button     
        Then I see the alert "Login successful"
        And I accept the alert
    Scenario: Successful expense application
        Given I am on the expense form page
        And I select "Travel" as the type
        And I select "Diana Prince" as the approver
        And I enter "2024-11-15" as the expense date
        And I enter "639" as the expense amount
        And I enter "Business Travel to Germany" as the reason
        When I click on the apply button
        Then I should see a submission confirmation
    Scenario: Unsuccessful expense application
        Given I am on the expense form page
        And I select "Food & Drinks" as the type
        And I select "Diana Prince" as the approver
        And I enter "2024-11-10" as the expense date
        When I click on the apply button
        Then I see the alert "Please fill out all required fields before submitting the form."