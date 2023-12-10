import styled from "styled-components";
import InnerButton from "./InnerButton";

const StyledInnerForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 30rem;

  & label {
    font-size: 1.4rem;
    color: var(--oc-gray-8);
  }
`;

const InnerButtontDiv = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-items: center;
`;

function InnerForm({
  children,
  onCloseModal,
  onSubmit,
  reset,
  isLoading,
  btnName,
}) {
  return (
    <StyledInnerForm
      autoComplete="off"
      onSubmit={
        // onSubmit
        (e) => {
          e.preventDefault();
          onSubmit();
          reset?.();
          onCloseModal?.();
        }
      }
    >
      {children}
      <InnerButtontDiv>
        <InnerButton
          bg="var(--oc-gray-1)"
          tc="var(--oc-gray-9)"
          bc="var(--oc-gray-4)"
          onClick={() => {
            onCloseModal?.();
            reset?.();
          }}
          type="reset"
        >
          Cancel
        </InnerButton>
        <InnerButton disabled={isLoading}>{btnName || "Save"}</InnerButton>
      </InnerButtontDiv>
    </StyledInnerForm>
  );
}

export default InnerForm;
