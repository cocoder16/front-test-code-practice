/// <reference types="cypress" />

import { TO_DO_LIST } from "src/config/endpoint";

describe("to-do-list", () => {
  beforeEach(() => {
    const HOST_URL = Cypress.env("REACT_APP_HOST_URL");
    cy.visit(HOST_URL);

    // intercept 두번째 파라미터인 URL에 호스트네임까지 풀로 적으면 stub하지 않고 실제 서버로 request를 보낸다.
    // 이렇게 하면 백엔드 서버를 꺼놓고(없어도) 의존성없이 테스트가 가능
    cy.intercept("GET", TO_DO_LIST.GET_ALL, req => {
      req.reply({
        fixture: "api/responseData/toDoList/get.json",
      });
    });
  });

  it("rendering initial to-do-list", () => {
    cy.get(".to-do-list .to-do-item").should($elements => {
      expect($elements).to.have.length(2);
      expect($elements.eq(0)).to.contain("0").to.contain("study test code");
      expect($elements.eq(1)).to.contain("1").to.contain("study cypress");
    });
  });

  it("send data and re-rendering when click checkbox", () => {
    cy.intercept("PATCH", TO_DO_LIST.UPDATE_CHECKED, cy.spy().as("api")).as(
      "updateChecked"
    );

    cy.get(".to-do-list .to-do-item:first")
      .find("input")
      .as("checkbox")
      .click();
    // API request 1) 횟수 1회, 2) request data
    cy.wait("@updateChecked").then(interception => {
      const { request } = interception;
      expect(request.body).to.deep.equal({ id: 0, checked: true });
    });
    cy.get("@api").its("callCount").should("equal", 1);

    // checkbox value
    cy.get("@checkbox").should("be.checked");
  });
});
