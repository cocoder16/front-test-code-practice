import { mount } from "@cypress/react";

import Button from "src/components/atoms/Button";

describe("Button Interface", () => {
  it("Button props", () => {
    const onClick = cy.stub().as("clickHandler");
    mount(<Button onClick={onClick}>Test button</Button>);

    cy.get("button").contains("Test button").click();
    cy.get("@clickHandler").should("have.been.calledOnce");
  });
});
