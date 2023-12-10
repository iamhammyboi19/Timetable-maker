import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";
import { useEffect } from "react";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoutes({ children }) {
  const { isAuthenticated, loadingUser } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated && !loadingUser) {
        navigate("/login", { replace: true });
      }
    },
    [isAuthenticated, navigate, loadingUser]
  );

  if (loadingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated === true) return <>{children}</>;
}

export default ProtectedRoutes;
