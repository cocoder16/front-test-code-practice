import { createAction, createSlice } from "@reduxjs/toolkit";

const updateChecked = createAction<IUpdateCheckedPayload>("UPDATE_CHECKED");

const initialState: IToDoListState = {
  toDoList: [],
};

export const reducer = {
  updateChecked: (state: IToDoListState, action: IUpdateCheckedAction) => {
    state.toDoList.find((todo: ToDo) => todo.id === action.payload.id).checked =
      action.payload.checked;
    return state;
  },
};

export default createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateChecked, reducer.updateChecked)
      .addDefaultCase((state, action) => {
        console.error("undefined action type: ", action.type);
        return state;
      });
  },
});
