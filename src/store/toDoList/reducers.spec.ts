import { reducer } from ".";

describe("to do list reducers", () => {
  const initialState: IToDoListState = {
    toDoList: [
      {
        id: 0,
        order: 0,
        content: "study test code",
        checked: false,
      },
      {
        id: 1,
        order: 1,
        content: "study cypress",
        checked: true,
      },
    ],
  };

  it("update to do check", () => {
    const action: IUpdateCheckedAction = {
      payload: { id: 0, checked: true },
    };
    const expectedResult: IToDoListState = {
      toDoList: [
        {
          id: 0,
          order: 0,
          content: "study test code",
          checked: true,
        },
        {
          id: 1,
          order: 1,
          content: "study cypress",
          checked: true,
        },
      ],
    };
    expect(reducer.updateChecked(initialState, action)).to.deep.equal(
      expectedResult
    );
  });

  // it("get all to-do-list data", () => {
  //   const action: IGetAllAction = {
  //     payload: initialState,
  //   };
  //   expect(
  //     reducer.getAll({ toDoList: [] }, action).to.deep.equal(initialState)
  //   );
  // });

  // TODO: code coverage 확인하는 세팅
  // TODO: axios get to do list data - 1) reducer unit test - 2) axios mocking 포함한 기능 테스트
  // TODO: 1) check 클릭했을때 기능 테스트
  // TODO: axios 응답 실패했을때 이후 로직
  // TODO: addDefaultCase 공통 함수로
});
