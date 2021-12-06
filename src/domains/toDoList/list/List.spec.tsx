import { mount } from "@cypress/react";
import { Provider } from "react-redux";

import List from ".";
import { store } from "src/store";
import { TO_DO_LIST } from "src/config/endpoint";

describe("List component", () => {
  beforeEach(() => {
    cy.intercept("GET", TO_DO_LIST.GET_ALL, req => {
      req.reply({
        fixture: "api/responseData/toDoList/get.json",
      });
    });
  });

  it("render List with initial items", () => {
    mount(
      <Provider store={store}>
        <List />
      </Provider>,
    );

    cy.get(".to-do-list").should("have.css", "display", "flex").and("have.css", "flex-direction", "column");
  });
});
