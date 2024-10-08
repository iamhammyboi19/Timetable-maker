import styled, { css } from "styled-components";

const StyledGridTemplates = styled.ul`
  display: grid;
  row-gap: 0.4rem;
  column-gap: 0.4rem;
  ${(props) =>
    props.cols
      ? css`
          grid-template-columns: repeat(${props.cols}, 1fr);
        `
      : ""}

  @media (max-width: 26.875em) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

function GridTemplatesMain({ children, cols }) {
  return (
    <div>
      <StyledGridTemplates cols={cols}>{children}</StyledGridTemplates>
    </div>
  );
}

// style={{ height: "68.3vh", overflow: "scroll" }}

export default GridTemplatesMain;
