import styled from "styled-components";

const StyledInnerLabelInputDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  margin-bottom: ${(props) => (props.nm === "no" ? "0rem" : "1.5rem")};
`;

function InnerLabelInputDiv({ children, nm }) {
  return (
    <StyledInnerLabelInputDiv nm={nm}>{children}</StyledInnerLabelInputDiv>
  );
}

export default InnerLabelInputDiv;
