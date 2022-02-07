# cypress

## cy.request와 cy.intercept차이

- cy.request는 network level에서 동작하므로 mock이 아닌 실제 서버에 요청을 보냄. <br />
  그래서 cy.intercept와 같이 동작을 안함.
- cy.intercept는 request를 만들지 않는다 network layer에서 발생하는 request를 단지 listen만 한다

## cy.\* 커맨드 만들기

https://docs.cypress.io/api/cypress-api/custom-commands#Parent-Commands

## watch & test re-run

```
# watch & test re-run이 왜 중요한지?
TDD 에서는 실패하는 테스트 코드를 먼저 작성하고 그다음에 어플리케이션 코드를 작성한다.
어플리케이션을 작성하고 바로 결과를 확인하려면 이 기능이 있는게 편하다
```

cypress는 일부 지원

run, run-ct는 watch모드를 지원하지 않도록 만들었다고 한다. watch모드를 원하면 open을 써야한다.

- open의 경우, any test file change발생하면 all reload, 어플리케이션 코드 변경은 페이지 hot reload는 되는데 테스트 re-run을 안함
  - 해결법은 플러그인 설치

```
open에서 어플리케이션 코드가 변경되어도 테스트를 rerun할 수 있는 플러그인
https://github.com/bahmutov/cypress-watch-and-reload
```

- open-ct의 경우, any test file change, 혹은 any test file이 import하고 있는 어플리케이션 코드 파일 change 발생하면 hot reload, re-run둘다 하는데, 켜놓은 테스트 파일만
