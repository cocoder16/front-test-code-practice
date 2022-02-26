# fireEvent vs userEvent

userEvent는 마치 사람이 직접 브라우저 상에서 행동하는 것처럼 연관된 유저 이벤트를 발생시킬 수 있다.

따라서 예를 들어 click이벤트라면, fireEvent는 코드로 명시한 한가지 이벤트 click만 발생시키지만, userEvent는 유저가 click을 할때 실제로 발생하는 다른 이벤트들도 모두 발생한다.

userEvent는 fireEvent처럼 target.value의 중첩 구조의 이벤트 객체를 넘길 필요가 없이, 실제 입력 텍스트만 넘기면 된다. 

따라서 userEvent를 사용하는 것이 더 실제 환경에 가깝게 테스트를 하는 것이다.

# uncontrolled component

공식 문서에서 직접 근거를 찾아본건 아니지만, uncontrolled component에 대해 fireEvent와 userEvent가 작동하지 않는 것으로 보인다.

input.test.tsx를 통해 현상을 직접 볼 수 있다. input 컴포넌트 내부에 value를 state로 선언하여 controlled component로 바꾸자 fireEvent와 userEvent가 작동하는 것까지 확인했다.
