import styled from "styled-components";
import InnerButton from "./InnerButton";
import { useLogout } from "../features/authentication/useLogout";
import { useUser } from "../features/authentication/useUser";

const HeaderUL = styled.ul`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 2rem;
  padding: 1.5rem 5rem;
  border-bottom: 0.5px solid var(--oc-gray-5);

  & li:first-child {
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-items: center;
    gap: 1rem;
  }

  @media (max-width: 26.875em) {
    padding: 1.5rem 2.5rem;
  }
`;

const UserAvatar = styled.img`
  border-radius: 50%;
  height: 3rem;
  max-width: 3rem;
  border: 1px solid var(--oc-gray-5);
`;

function MainHeader() {
  const { logoutUser, isLoggingOutUser } = useLogout();
  const {
    user_metadata: { fullName, avatar },
  } = useUser();
  return (
    <header>
      <nav>
        <HeaderUL>
          <li>
            <UserAvatar src={avatar || "/userav.png"} />
            <span
              style={{
                letterSpacing: "1px",
                fontWeight: 300,
                color: "#2e2e2e",
              }}
            >
              {fullName?.toUpperCase()}
            </span>
          </li>
          <li>
            <InnerButton
              disabled={isLoggingOutUser}
              bg="var(--oc-red-8)"
              bc="var(--oc-red-5)"
              onClick={logoutUser}
            >
              Logout
            </InnerButton>
          </li>
        </HeaderUL>
      </nav>
    </header>
  );
}

export default MainHeader;
