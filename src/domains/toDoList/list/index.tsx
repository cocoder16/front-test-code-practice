import { useState } from "react";

import Item from "src/domains/toDoList/item";
import StyledList from "./List.styled";

function List() {
  const [toDoList, setToDoList] = useState<ToDoList>([]);

  return (
    <StyledList className="to-do-list">
      {toDoList.map(toDo => (
        <Item toDo={toDo} />
      ))}
    </StyledList>
  );
}

export default List;
