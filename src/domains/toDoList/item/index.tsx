import Input from "src/components/atoms/Input";
import StyledItem from "./Item.styled";

interface IProps {
  toDo: ToDo;
}

function Item({ toDo }: IProps) {
  const { id, order, content, checked } = toDo;
  const onChange = () => {};

  return (
    <StyledItem className="to-do-item" order={order}>
      <div>{id}</div>
      <p>{content}</p>
      <Input type="checkbox" defaultChecked={checked} onChange={onChange} />
    </StyledItem>
  );
}

export default Item;
