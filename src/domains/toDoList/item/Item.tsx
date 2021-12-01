import Input from "src/components/atoms/Input";
import StyledItem from "./Item.styled";

function Item({ id, order, content, checked }: ToDo) {
  const onChange = () => {};

  return (
    <StyledItem className="todo-item" order={order}>
      <div>{id}</div>
      <p>{content}</p>
      <Input type="checkbox" defaultChecked={checked} onChange={onChange} />
    </StyledItem>
  );
}

export default Item;
