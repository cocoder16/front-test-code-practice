/// <reference types="cypress" />

import { TO_DO_LIST } from "src/config/endpoint";

describe("to-do-list", () => {
  beforeEach(() => {
    const HOST_URL = Cypress.env("REACT_APP_HOST_URL");
    cy.visit(HOST_URL);
  });

  it("get all to-do-list data and rendering", () => {
    // intercept 두번째 파라미터인 URL에 호스트네임까지 풀로 적으면 stub하지 않고 실제 서버로 request를 보낸다.
    // 이렇게 하면 백엔드 서버를 꺼놓고(없어도) 의존성없이 테스트가 가능
    cy.intercept("GET", TO_DO_LIST.GET_ALL, {
      fixture: "api/responseData/toDoList/get.json",
    });

    cy.get(".to-do-list .to-do-item").should($list => {
      expect($list).to.have.length(2);
      expect($list.eq(0)).to.contain("0").to.contain("study test code");
      expect($list.eq(1)).to.contain("1").to.contain("study cypress");
    });
  });
});
