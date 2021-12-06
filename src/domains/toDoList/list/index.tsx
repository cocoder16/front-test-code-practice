import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import StyledList from "./List.styled";
import Item from "src/domains/toDoList/item";
import { RootState, AppDispatch } from "src/store";
import { action } from "src/store/toDoList";

function List() {
  const toDoList: ToDoList = useSelector((state: RootState) => state.toDoList.toDoList);
  const dispatch = useDispatch<AppDispatch>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // dispatch의 예외처리는 rejected promise를 반환하지 않는다. 그 이유:
    // https://redux-toolkit.js.org/api/createAsyncThunk#checking-errors-after-dispatching
    dispatch(action.getAll())
      .unwrap()
      .then(response => {
        console.log("### response: ", response);
      })
      .catch(error => {
        console.log("### error: ", error);
        setErrorMessage(error.message);
      });
  }, []);

  return (
    <StyledList className="to-do-list">
      {errorMessage && <div>{errorMessage}</div>}
      {toDoList && toDoList.map(toDo => <Item key={toDo.id} toDo={toDo} />)}
    </StyledList>
  );
}

export default List;
