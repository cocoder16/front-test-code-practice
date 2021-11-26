import Input from "src/components/atoms/Input";
import StyledItem from "./Item.styled";

type IProps = {
  id: number;
  order: number;
  content: string;
  checked: boolean;
};

function Item({ id, order, content, checked }: IProps) {
  const onChange = () => {};

  return (
    <StyledItem order={order}>
      <div>{id}</div>
      <p>{content}</p>
      <Input type="checkbox" defaultChecked={checked} onChange={onChange} />
    </StyledItem>
  );
}

export default Item;
