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
});
