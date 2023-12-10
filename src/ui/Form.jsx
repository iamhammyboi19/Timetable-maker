import styled from "styled-components";

const StyledForm = styled.form`
  max-width: 50rem;
  border: 1px solid var(--oc-gray-4);
  margin: ${(props) => (props.type === "signup" ? "10rem auto" : "17rem auto")};
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
`;

function Form({ children, type, onSubmit }) {
  return (
    <StyledForm onSubmit={onSubmit} type={type}>
      {children}
    </StyledForm>
  );
}

export default Form;
