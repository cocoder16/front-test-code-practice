import { mount } from "@cypress/react";

import Item from "./Item";

describe("Item component", () => {
  it("render first order Item which have border-top and no checked", () => {
    const props: ToDo = {
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

    cy.get(".todo-item").should(
      "have.css",
      "border-top",
      "1px solid rgb(0, 0, 0)"
    );
    cy.get("p").contains(props.content);
    cy.get("input[type='checkbox']").should("not.be.checked");
  });

  it("render second order Item which don't have border-top and checked", () => {
    const props: ToDo = {
      id: 1,
      order: 1,
      content: "Study cypress",
      checked: true,
    };

    mount(
      <Item
        id={props.id}
        order={props.order}
        content={props.content}
        checked={props.checked}
      />
    );

    cy.get(".todo-item").should(
      "have.css",
      "border-top",
      "0px none rgb(0, 0, 0)"
    );
    cy.get("input[type='checkbox']").should("be.checked");
  });

  it("rerender Item checked when click checkbox", () => {
    const props: ToDo = {
      id: 1,
      order: 1,
      content: "Study cypress",
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

    cy.get(".todo-item input[type='checkbox']").as("checkbox").click();
    cy.get("@checkbox").should("be.checked");
  });
});
