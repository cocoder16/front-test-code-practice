import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import utilReducer from "src/store/utils/reducer";
import service from "src/services/toDoList";

const actionPrefix = "TO_DO_LIST";

export const action = {
  getAll: createAsyncThunk(`${actionPrefix}/GET_ALL`, async () => {
    // TODO: 이 패턴이 중복 되면 함수로 빼내서 유닛테스트와 함께 모듈화
    const response = await service.getAll();
    return response.data;
  }),
  updateChecked: createAction<IUpdateCheckedPayload>(
    `${actionPrefix}/UPDATE_CHECKED`
  ),
};

const initialState: IToDoListState = {
  toDoList: [],
};

export const reducer = {
  getAll: (state: IToDoListState, action: IGetAllAction) => {
    state.toDoList = action.payload.toDoList;
    return state;
  },
  updateChecked: (state: IToDoListState, action: IUpdateCheckedAction) => {
    state.toDoList.find((todo: ToDo) => todo.id === action.payload.id).checked =
      action.payload.checked;
    return state;
  },
};

const toDoListSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(action.getAll.fulfilled, reducer.getAll)
      .addCase(action.updateChecked, reducer.updateChecked)
      .addDefaultCase(utilReducer.unknownType);
  },
});

export default toDoListSlice.reducer;
