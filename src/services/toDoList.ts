import axios from "axios";

import { API_URL, TO_DO_LIST } from "src/config/endpoint";

const toDoList = {
  postToDo: (payload: IPostToDoRequestPayload) => {
    return axios({
      method: "post",
      url: API_URL + TO_DO_LIST.POST_TO_DO,
      data: payload,
    });
  },
  getAll: () => {
    return axios({
      method: "get",
      url: API_URL + TO_DO_LIST.GET_ALL,
    });
  },
  updateChecked: (payload: IUpdateCheckedPayload) => {
    return axios({
      method: "patch",
      url: API_URL + TO_DO_LIST.UPDATE_CHECKED,
      data: payload,
    });
  },
  deleteToDo: (payload: IDeleteToDoPayload) => {
    return axios({
      method: "delete",
      url: API_URL + TO_DO_LIST.DELETE.replace(":id", String(payload.id)),
    });
  },
};

export default toDoList;
