import styled from "styled-components";

const StyledInnerButton = styled.button`
  font-size: 1.4rem;
  font-weight: 400;
  background-color: ${(props) => props.bg || "var(--oc-green-9)"};
  color: ${(props) => props.tc || "var(--oc-white)"};
  border-radius: var(--border-radius-md);
  padding: 0.4rem 1.5rem;
  display: inline-block;
  height: 3rem;
  border: 1px solid ${(props) => props.bc || "var(--oc-green-4)"};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.oh || ""};
  }
`;

function InnerButton({ children, bg, bc, onClick, tc, type, disabled }) {
  return (
    <StyledInnerButton
      disabled={disabled}
      onClick={onClick}
      bg={bg}
      bc={bc}
      tc={tc}
      type={type}
    >
      {children}
    </StyledInnerButton>
  );
}

export default InnerButton;
