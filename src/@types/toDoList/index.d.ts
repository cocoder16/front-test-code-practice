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

interface Action {
  type?: string;
}

interface IUpdateCheckedPayload {
  id: number;
  checked: boolean;
}

interface IUpdateCheckedAction extends Action {
  payload: IUpdateCheckedPayload;
}

interface IGetAllPayload {
  toDoList: ToDoList;
}

interface IGetAllAction extends Action {
  payload: IGetAllPayload;
}
