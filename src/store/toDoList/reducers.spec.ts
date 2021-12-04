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

  it("get all to-do-list data", () => {
    // !! redux-thunk가 포함된 action에 대한 reducer test
    // - api mocking 해서 request와 response를 하는 것은 기능테스트에서 진행한다.
    // - reducer function에 대한 unit test이므로 reducer function에 들어갈 action.payload값만 정해준다. 그 값은 api response data지만, api mocking은 여기서 하지 않는다.
    const action: IGetAllAction = {
      payload: { toDoList: initialState.toDoList }, // api response data
    };

    expect(reducer.getAll({ toDoList: [] }, action)).to.deep.equal(
      initialState
    );
  });

  // TODO: action type 각 상태에 대해 다 정의를 해놔야할지?
  // TODO: 1) check 클릭했을때 기능 테스트
  // TODO: axios 응답 실패했을때 이후 로직
});
