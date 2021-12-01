import styled from "styled-components";

interface IProps {
  order: number;
}

const StyledItem = styled.div<IProps>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-top: ${({ order }) => order === 0 && "1px solid black"};
  border-bottom: 1px solid black;
  padding: 4px;

  div {
    margin: 0 10px;
  }

  p {
    margin-block-start: 0;
    margin-block-end: 0;
    width: 300px;
  }
`;

export default StyledItem;
