import { useDispatch } from "react-redux";

import StyledItem from "./Item.styled";
import Input from "src/components/atoms/Input";
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

  return (
    <StyledItem className="to-do-item" order={order}>
      <div>{id}</div>
      <p>{content}</p>
      <Input type="checkbox" defaultChecked={checked} onChange={onChange} />
    </StyledItem>
  );
}

export default Item;
