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
  ${(props) =>
    props.rows
      ? css`
          grid-template-rows: repeat(${props.rows}, 1fr);
        `
      : ""} /* @media (max-width: 26.875em) {
    column-gap: 0.2rem;
    row-gap: 0.2rem;
  } */
`;

const SideRow = styled.div`
  position: absolute;
  inset-block-start: 6rem;
  display: grid;
  ${(props) =>
    props.rows
      ? css`
          grid-template-rows: repeat(${props.rows}, 12.45rem);
        `
      : ""}
  inset-inline-end: 99%;
  row-gap: 0.4rem;

  @media (max-width: 48.875em) {
    ${(props) =>
      props.rows
        ? css`
            grid-template-rows: repeat(${props.rows}, 9rem);
          `
        : ""}
    inset-inline-end: 97%;
  }
`;

const Time = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
`;

function GridTemplatesSub({ children, cols, allTimes, rows }) {
  return (
    <div>
      <StyledGridTemplates cols={cols} rows={rows}>
        {children}
      </StyledGridTemplates>
      <SideRow rows={allTimes?.length}>
        {allTimes.map((el) => (
          <Time key={el}>{el}</Time>
        ))}
      </SideRow>
    </div>
  );
}

// style={{ height: "68.3vh", overflow: "scroll" }}

export default GridTemplatesSub;
