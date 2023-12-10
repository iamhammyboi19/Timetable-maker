import styled from "styled-components";

const InnerInput = styled.input`
  padding: 1rem 1.3rem;
  font-size: 1.4rem;
  border: 1px solid var(--oc-gray-4);
  border-radius: var(--border-radius-md);
  transition: all 0.3s ease;
  width: 100%;

  &:focus {
    outline: none;
    border: 1px solid var(--oc-gray-6);
  }
`;

export default InnerInput;
