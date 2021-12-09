import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import service from "src/services/toDoList";

const actionPrefix = "TO_DO_LIST";

export const action = {
  getAll: createAsyncThunk(`${actionPrefix}/GET_ALL`, async (_, { rejectWithValue }) => {
    // TODO: 이 패턴이 중복 되면 함수로 빼내서 유닛테스트와 함께 모듈화
    return service
      .getAll()
      .then(response => response.data)
      .catch(error => rejectWithValue(error.response.data)); // rejectWithValue 로 하면 dispatch().unwrap().catch() 에서 받을 수 있다
  }),
  updateChecked: createAsyncThunk(`${actionPrefix}/UPDATE_CHECKED`, async (payload: IUpdateCheckedPayload) => {
    await service.updateChecked(payload);
    return payload;
  }),
  deleteToDo: createAsyncThunk(`${actionPrefix}/DELETE_TODO`, async (payload: IDeleteToDoPayload) => {
    await service.deleteToDo(payload);
    return payload;
  }),
};

const initialState: IToDoListState = {
  toDoList: [],
};

export const reducer = {
  postToDo: (state: IToDoListState, action: IPostToDoAction) => {
    state.toDoList.push(action.payload.toDo);
    return state;
  },
  getAll: (state: IToDoListState, action: IGetAllAction) => {
    state.toDoList = action.payload.toDoList;
    return state;
  },
  updateChecked: (state: IToDoListState, action: IUpdateCheckedAction) => {
    state.toDoList.find((todo: ToDo) => todo.id === action.payload.id).checked = action.payload.checked;
    return state;
  },
  deleteToDo: (state: IToDoListState, action: IDeleteToDoAction) => {
    state.toDoList = state.toDoList.filter((todo: ToDo) => todo.id !== action.payload.id);
    return state;
  },
};

const toDoListSlice = createSlice({
  name: "toDoList",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(action.getAll.fulfilled, reducer.getAll)
      .addCase(action.updateChecked.fulfilled, reducer.updateChecked)
      .addCase(action.deleteToDo.fulfilled, reducer.deleteToDo);
  },
});

export default toDoListSlice.reducer;
