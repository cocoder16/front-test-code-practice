import { mount } from "@cypress/react";

import List from ".";

describe("List component", () => {
  it("render List with initial items", () => {
    mount(<List />);

    cy.get(".to-do-list")
      .should("have.css", "display", "flex")
      .and("have.css", "flex-direction", "column");
  });
});
