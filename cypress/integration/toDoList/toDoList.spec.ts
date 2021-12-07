/// <reference types="cypress" />

import { TO_DO_LIST } from "src/config/endpoint";

describe("to-do-list", () => {
  beforeEach(() => {
    const HOST_URL = Cypress.env("REACT_APP_HOST_URL");
    cy.visit(HOST_URL);
  });

  it("rendering initial to-do-list", () => {
    // intercept 두번째 파라미터인 URL에 호스트네임까지 풀로 적으면 stub하지 않고 실제 서버로 request를 보낸다.
    // 이렇게 하면 백엔드 서버를 꺼놓고(없어도) 의존성없이 테스트가 가능
    cy.intercept("GET", TO_DO_LIST.GET_ALL, req => {
      req.reply({
        fixture: "api/responseData/toDoList/get.json",
      });
    });

    cy.get(".to-do-list .to-do-item").should($elements => {
      expect($elements).to.have.length(2);
      expect($elements.eq(0)).to.contain("0").to.contain("study test code");
      expect($elements.eq(1)).to.contain("1").to.contain("study cypress");
    });
  });

  it("send data and re-rendering when click checkbox", () => {
    // check후 input render test는 unit test에서 원래 있었으나, 이 e2e 테스트 작성으로 인해 커버가 되므로 유닛테스트를 제거했음.
    cy.intercept("GET", TO_DO_LIST.GET_ALL, req => {
      req.reply({
        fixture: "api/responseData/toDoList/get.json",
      });
    });
    cy.intercept("PATCH", TO_DO_LIST.UPDATE_CHECKED).as("updateChecked");

    cy.get(".to-do-list .to-do-item:first").find("input").as("checkbox");
    cy.get("@checkbox").click();
    // API request 1) 횟수 1회, 2) request data
    cy.wait("@updateChecked").then(interception => {
      const { request } = interception;
      expect(request.body).to.deep.equal({ id: 0, checked: true });
    });
    // 호출횟수 테스트는 cypress의 retry기능때문에 하지 않는다.
    // cy.get("@api").its("callCount").should("equal", 1); // 호출횟수는 여러 컴포넌트들의 라이프사이클에 맞물려서 틀어질 수 있으므로 unit이 아니라 e2e에서 한다.

    // checkbox value
    cy.get("@checkbox").should("be.checked");

    cy.get("@checkbox").click();
    cy.wait("@updateChecked");
    cy.get("@checkbox").should("not.be.checked");
  });

  it("render error message when fail to get initial to-do-list", () => {
    cy.intercept("GET", TO_DO_LIST.GET_ALL, req => {
      req.reply({
        statusCode: 400,
        body: {
          message: "fail to get data",
        },
      });
    }).as("failed");
    cy.wait("@failed");

    // MUI toast 써야하지만, 귀찮아서 그냥 text rendering으로
    cy.get(".to-do-list").should("have.text", "fail to get data");
  });
});
