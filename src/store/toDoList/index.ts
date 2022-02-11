import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

import service from "src/services/toDoList";

const actionPrefix = "TO_DO_LIST";

export const action = {
  postToDo: createAsyncThunk(
    `${actionPrefix}/POST_TO_DO`,
    async (payload: IPostToDoRequestPayload, { rejectWithValue }) => {
      return service
        .postToDo(payload)
        .then(response => response.data)
        .catch(error => rejectWithValue(error.response.data)); // 400, 500번대 이거나 요청이 failed 일때, catch로 들어옴
    },
  ),
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
  },
  getAll: (state: IToDoListState, action: IGetAllAction) => {
    state.toDoList = action.payload.toDoList;
  },
  handleReject: (state: IToDoListState, action: any) => {
    // state.toDoList = [
    //   {
    //     id: 99,
    //     order: 99,
    //     content: "!!",
    //     checked: true,
    //   },
    // ];
    // 실패한 요청에 대해서는 리덕스에서 딱히 처리해주고 싶은 로직이 없는데?
    // 뭐이런것도 가능은 함.
  },
  updateChecked: (state: IToDoListState, action: IUpdateCheckedAction) => {
    state.toDoList.find((todo: ToDo) => todo.id === action.payload.id).checked = action.payload.checked;
  },
  deleteToDo: (state: IToDoListState, action: IDeleteToDoAction) => {
    state.toDoList = state.toDoList.filter((todo: ToDo) => todo.id !== action.payload.id);
  },
};

const toDoListReducer = createReducer(initialState, builder => {
  builder
    .addCase(action.postToDo.fulfilled, reducer.postToDo)
    .addCase(action.getAll.fulfilled, reducer.getAll)
    .addCase(action.getAll.rejected, reducer.handleReject) // 400, 500번대 이거나 요청이 failed 일때, rejected로 들어옴
    .addCase(action.updateChecked.fulfilled, reducer.updateChecked)
    .addCase(action.deleteToDo.fulfilled, reducer.deleteToDo);
});

export default toDoListReducer;
