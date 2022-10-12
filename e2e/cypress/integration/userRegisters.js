/// <reference types="Cypress" />

describe("As a user visiting the sign in page", () => {
  const visitRegistrationPage = () => {
    cy.visit("/users/new");
  };

  before(() => {
    cy.task("db:truncate", "User");
  });

  it("If I provide a valid email, username, password, and password confirmation, I will be signed in", () => {
    visitRegistrationPage();
    cy.get("form").within(() => {
      cy.findByLabelText('Username').type('username')
      cy.findByLabelText("Email").type("user@example.com");
      cy.findByLabelText("Password").type("Password123");
      cy.findByLabelText("Password Confirmation").type("Password123");

      cy.root().submit();

      cy.url().should("eq", `${Cypress.config().baseUrl}/recipes`);
    });
    cy.contains("Sign Out");
  });

  it("If I provide an invalid email and password, I will remain on the same page", () => {
    visitRegistrationPage();
    cy.get("form").within(() => {
      cy.findByLabelText("Email").type("just@a.joke");
      cy.findByLabelText("Password").type("Password123");

      cy.root().submit();

      cy.url().should("eq", `${Cypress.config().baseUrl}/users/new`);
    });
  });

  it("If passwords don't match, I will remain on the same page", () => {
    visitRegistrationPage();
    cy.get("form").within(() => {
      cy.findByLabelText('Username').type('username')
      cy.findByLabelText("Email").type("user@example.com");
      cy.findByLabelText("Password").type("Password123");
      cy.findByLabelText("Password Confirmation").type("passwordNotAMatch");

      cy.root().submit();
      cy.url().should("eq", `${Cypress.config().baseUrl}/users/new`);
    });
  });

  it("I will see an error message when no email is provided", () => {
    visitRegistrationPage();
    cy.get("form").within(() => {
      cy.findByLabelText('Username').type('username')
      cy.findByLabelText("Password").type("Migratedata1");

      cy.root().submit();

      cy.contains("is invalid");
    });
  });

  it("I will see an error message when no username is provided", () => {
    visitRegistrationPage();
    cy.get("form").within(() => {
      cy.findByLabelText("Email").type("user@example.com");
      cy.findByLabelText("Password").type("Password123");
      cy.findByLabelText("Password Confirmation").type("Password123");

      cy.root().submit();

      cy.contains("must be at least 5 characters");
      cy.url().should('eq', `${Cypress.config().baseUrl}/users/new`)
    })
  })
});
