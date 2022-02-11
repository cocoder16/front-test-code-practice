import { reducer } from ".";

describe("to-do-list reducers", () => {
  beforeEach(function () {
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
    this.initialState = initialState;
  });

  it("post to-do", function () {
    const action: IPostToDoAction = {
      payload: {
        toDo: {
          id: 2,
          order: 2,
          content: "CI/CD",
          checked: false,
        },
      },
    };
    const expectedResult: IToDoListState = {
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
        {
          id: 2,
          order: 2,
          content: "CI/CD",
          checked: false,
        },
      ],
    };

    reducer.postToDo(this.initialState, action);

    expect(this.initialState).to.deep.equal(expectedResult);
  });

  it("get all to-do-list data", function () {
    // !! redux-thunk가 포함된 action에 대한 reducer test
    // - api mocking 해서 request와 response를 하는 것은 기능테스트에서 진행한다.
    // - reducer function에 대한 unit test이므로 reducer function에 들어갈 action.payload값만 정해준다. 그 값은 api response data지만, api mocking은 여기서 하지 않는다.
    const action: IGetAllAction = {
      payload: { toDoList: this.initialState.toDoList }, // api response data
    };
    const initialState = { toDoList: [] };

    reducer.getAll(initialState, action);

    expect(initialState).to.deep.equal(this.initialState);
  });

  it("update to-do check", function () {
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

    reducer.updateChecked(this.initialState, action);

    expect(this.initialState).to.deep.equal(expectedResult);
  });

  it("delete to-do", function () {
    const action: IDeleteToDoAction = {
      payload: { id: 0 },
    };
    const expectedResult: IToDoListState = {
      toDoList: [
        {
          id: 1,
          order: 1,
          content: "study cypress",
          checked: true,
        },
      ],
    };

    reducer.deleteToDo(this.initialState, action);

    expect(this.initialState).to.deep.equal(expectedResult);
  });
});
