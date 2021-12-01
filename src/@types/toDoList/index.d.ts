type ToDo = {
  id: number;
  order: number;
  content: string;
  checked: boolean;
};

type ToDoList = ToDo[] | [];

interface IToDoListState {
  toDoList: IToDoList;
}

interface IUpdateCheckedPayload {
  id: number;
  checked: boolean;
}

interface IUpdateCheckedAction {
  payload: IUpdateCheckedPayload;
  type?: string;
}
