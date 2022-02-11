/// <reference types="cypress" />

describe("not-found", () => {
  it("When visit none page, Then redirect to not-found page", () => {
    const HOST_URL = Cypress.env("REACT_APP_HOST_URL");

    cy.visit(HOST_URL + "/asdfg");

    cy.contains("not found page").should("exist");
  });
});

export {};
