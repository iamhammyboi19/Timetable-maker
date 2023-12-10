import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  font-size: 1.8rem;
  padding: 1.2rem 1.8rem;
  border-radius: 22px;
  border: none;
  border: 2px solid var(--oc-gray-4);
  transition: box-shadow 0.3s ease;
  color: var(--oc-gray-8);

  &::placeholder {
    color: var(--oc-gray-6);
    font-weight: 300;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--oc-gray-5);
  }
`;

export default Input;
