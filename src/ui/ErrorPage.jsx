import styled from "styled-components";
import GlobalStyle from "../styles/GlobalStyles";
import InnerButton from "./InnerButton";

const MiddleMan = styled.div`
  margin: 20rem auto;
  max-width: 50rem;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const P = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  padding: 3rem 6rem;
  border: 0.3px solid black;
  color: var(--oc-gray-9);
  margin-bottom: 2rem;
`;

function ErrorPage({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyle />
      <MiddleMan>
        <h1
          style={{
            fontSize: "1.3rem",
            marginBottom: "3rem",
          }}
        >
          Opps something went wrong ⛔️
        </h1>
        <P>{error.message}</P>
        <InnerButton onClick={resetErrorBoundary}>Try again</InnerButton>
      </MiddleMan>
    </>
  );
}

export default ErrorPage;
