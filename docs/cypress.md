# cypress

## cy.request와 cy.intercept차이

- cy.request는 network level에서 동작하므로 mock이 아닌 실제 서버에 요청을 보냄. <br />
  그래서 cy.intercept와 같이 동작을 안함.
- cy.intercept는 request를 만들지 않는다 network layer에서 발생하는 request를 단지 listen만 한다

## cy.\* 커맨드 만들기

https://docs.cypress.io/api/cypress-api/custom-commands#Parent-Commands
