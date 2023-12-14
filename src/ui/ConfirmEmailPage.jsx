import styled from "styled-components";
import GlobalStyle from "../styles/GlobalStyles";

const MiddleMan = styled.div`
  margin: 12rem auto;
  max-width: 50rem;
  padding: 5rem;
  border: 0.2px solid black;
`;

function ConfirmEmailPage() {
  return (
    <>
      <GlobalStyle />
      <MiddleMan>
        <h1
          style={{ textAlign: "center", lineHeight: 1.1, marginBottom: "3rem" }}
        >
          Confirm Timetable Maker Account
        </h1>
        <p style={{ textAlign: "center" }}>
          Please check your email address to confirm your timetable maker
          account
        </p>
      </MiddleMan>
    </>
  );
}

export default ConfirmEmailPage;
