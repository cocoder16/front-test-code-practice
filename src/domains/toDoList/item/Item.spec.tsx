import { mount } from "@cypress/react";

import Item from "./Item";

describe("Item component", () => {
  it("render Item with Props", () => {
    const props = {
      id: 0,
      order: 0,
      content: "Study test code",
      checked: false,
    };

    mount(
      <Item
        id={props.id}
        order={props.order}
        content={props.content}
        checked={props.checked}
      />
    );

    cy.get("p").contains(props.content);
    cy.get("input[type='checkbox']").should("not.be.checked");
  });
});
