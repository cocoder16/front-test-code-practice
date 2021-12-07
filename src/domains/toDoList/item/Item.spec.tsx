import { mount } from "@cypress/react";
import { Provider } from "react-redux";

import Item from ".";
import { store } from "src/store";

describe("Item component", () => {
  const mountItem = (props: ToDo) => {
    mount(
      <Provider store={store}>
        <Item toDo={props} />
      </Provider>,
    );
  };

  it("render first order Item which have border-top and no checked", () => {
    const props: ToDo = {
      id: 0,
      order: 0,
      content: "Study test code",
      checked: false,
    };

    mountItem(props);

    cy.get(".to-do-item").should("have.css", "border-top", "1px solid rgb(0, 0, 0)");
    cy.get("p").contains(props.content);
    cy.get("input[type='checkbox']").should("not.be.checked");
    cy.get("button").contains("삭제");
  });

  it("render second order Item which don't have border-top and checked", () => {
    const props: ToDo = {
      id: 1,
      order: 1,
      content: "Study cypress",
      checked: true,
    };

    mountItem(props);

    cy.get(".to-do-item").should("have.css", "border-top", "0px none rgb(0, 0, 0)");
    cy.get("input[type='checkbox']").should("be.checked");
  });
});
