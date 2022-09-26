/// <reference types="Cypress" />

import { first } from "cheerio/lib/api/traversing";

describe("As a user submitting a recipe to scrape", () => {
  const visitRecipeIndexPage = () => {
    cy.visit("/recipes")
  }
  const visitSignInPage = () => {
    cy.visit("/user-sessions/new");
  };

  before(() => {
    cy.task('db:truncate', "User")
    cy.task('db:insert', {
      modelName: "User",
      json: { email: 'user@example.com', username: "username", password: "Password123"}
    })
    visitSignInPage()
    cy.get("form").within(() => {
      cy.findByLabelText("Email").type("user@example.com");

      cy.findByLabelText("Password").type("Password123");

      cy.root().submit();

      cy.url().should("eq", `${Cypress.config().baseUrl}/recipes`);
    });
    cy.contains("Sign Out");
  })

  it("If I provide a url to a recipe, it will scrape the recipe information and persist the data to the database", () => {
    visitRecipeIndexPage()
    cy.get('form').within(() => {
      cy.findByLabelText('Enter a Recipe URL').type('https://www.bonappetit.com/recipe/banana-bread')

      cy.root().first().submit()

      cy.contains('Recipe scraped ✔️')
      cy.url().should('eq', `${Cypress.config().baseUrl}/recipes`)
    })
  })

  it('If I provide a recipe url not included in the scraper, I will see an error message', () => {
    cy.get('form').within(() => {
      cy.findByLabelText('Enter a Recipe URL').type('https://shesimmers.com/2012/05/pad-ka-prao-%E0%B8%9C%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%B0%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%B2.html')
      cy.root().first().submit()

      cy.contains(`couldn't scrape recipe from URL`)

    })
  })

  it('If I use Wild Mode for a recipe url, it will scrape the recipe information', () => {
    cy.get('form').within(() => {
      cy.findByLabelText('Wild mode*').click()
      cy.root().first().submit()
      // cy.root().first().submit()
      // cy.contains('Recipe scraped ✔️')


    })
  })
})