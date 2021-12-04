import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import StyledList from "./List.styled";
import Item from "src/domains/toDoList/item";
import { RootState } from "src/store";
import { action } from "src/store/toDoList";

function List() {
  const toDoList: ToDoList = useSelector(
    (state: RootState) => state.toDoList.toDoList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action.getAll());
  }, []);

  return (
    <StyledList className="to-do-list">
      {toDoList.map(toDo => (
        <Item key={toDo.id} toDo={toDo} />
      ))}
    </StyledList>
  );
}

export default List;
