import { useDispatch } from "react-redux";

import StyledItem from "./Item.styled";
import { Input, Button } from "src/components/atoms";
import { action } from "src/store/toDoList";

interface IProps {
  toDo: ToDo;
}

function Item({ toDo }: IProps) {
  const { id, order, content, checked } = toDo;
  const dispatch = useDispatch();

  const onChange = ({ newChecked }: InputChangeParameter) => {
    dispatch(action.updateChecked({ id, checked: newChecked as boolean }));
  };

  const onDeleteToDo = () => {
    dispatch(action.deleteToDo({ id }));
  };

  return (
    <StyledItem className="to-do-item" order={order}>
      <div>{id}</div>
      <p>{content}</p>
      <Input type="checkbox" defaultChecked={checked} onChange={onChange} />
      <Button onClick={onDeleteToDo}>삭제</Button>
    </StyledItem>
  );
}

export default Item;
