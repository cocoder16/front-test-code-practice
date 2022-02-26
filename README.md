# frontend test code practice

jest, cypress등 테스팅 라이브러리들을 사용하여 좋은 테스트 코드를 만들기 위해 여러 삽질들을 해보는 레포

# reference

jest
https://jestjs.io/docs/getting-started

TDD와 BDD
https://kdata.or.kr/info/info_04_view.html?field=&keyword=&type=techreport&page=48&dbnum=172089&mode=detail&type=techreport

# workflow

## 환경변수 넣는 법

깃허브 레파지토리 settings - secrets - actions 에서 레파지토리 secret 추가하여 환경변수 추가
workflows 코드보면, 이것을 사용할 수 있음

# cypress vs jest 유닛테스트 비교

1. jest - react testing library 나 enzyme을 같이 써야 편함
2. cypress - 자체적으로 mocha등 다 포함되어있음

### 런타임

비슷

### watch-all & hot reload

```
# watch & test re-run이 왜 중요한지?
TDD 에서는 실패하는 테스트 코드를 먼저 작성하고 그다음에 어플리케이션 코드를 작성한다.
어플리케이션을 작성하고 바로 결과를 확인하려면 이 기능이 있는게 편하다
```

- cypres는 플러그인 쓰면 지원
- jest는 지원

### 빌드타임

cypress 빌드 오래걸림, open-ct쓰면 평소엔 문제 없긴한데 run-ct 오래걸리는건 생각해야함

### 코드

- cypress가 훨씬 깨끗하고 사용하기도 쉬움
- react-testing-library는 uncontrolled component는 이벤트 액션 이후 단언을 테스트할 수 없다. enzyme는 안해봐서 모르겠다. cypress는 uncontrolled component에 대해서도 테스트가 가능하다.
