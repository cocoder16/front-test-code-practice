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

interface IAction {
  type?: string;
}

interface IGetAllPayload {
  toDoList: ToDoList;
}

interface IGetAllAction extends IAction {
  payload: IGetAllPayload;
}

interface IUpdateCheckedPayload {
  id: number;
  checked: boolean;
}

interface IUpdateCheckedAction extends IAction {
  payload: IUpdateCheckedPayload;
}

interface IDeleteToDoPayload {
  id: number;
}

interface IDeleteToDoAction extends IAction {
  payload: IDeleteToDoPayload;
}
