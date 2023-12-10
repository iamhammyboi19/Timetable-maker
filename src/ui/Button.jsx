import styled from "styled-components";

const SLButton = styled.button`
  font-size: 1.9rem;
  padding: 1.2rem 6rem;
  border-radius: ${(props) =>
    props.round === "sm" ? "var(--border-radius-sm)" : "25px"};
  border: none;
  background-color: var(--oc-indigo-7);
  color: var(--oc-white);
  margin: 2rem;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    background-color: var(--oc-indigo-6);
  }
`;

function Button({ children, round, disabled }) {
  return (
    <SLButton disabled={disabled} round={round}>
      {children}
    </SLButton>
  );
}

export default Button;
