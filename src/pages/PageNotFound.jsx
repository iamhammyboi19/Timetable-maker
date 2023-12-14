import styled from "styled-components";
import InnerButton from "../ui/InnerButton";
import { useNavigate } from "react-router-dom";

const MiddleMan = styled.div`
  margin: 12rem auto;
  max-width: 50rem;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 1rem;
`;

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <MiddleMan>
      <h1 style={{ fontSize: "10rem", textAlign: "center" }}>404 🚫</h1>
      <h5 style={{ textAlign: "center", fontSize: "3rem" }}>Page not found</h5>
      <InnerButton onClick={() => navigate(-1)}>&larr; Go back</InnerButton>
    </MiddleMan>
  );
}

export default PageNotFound;
