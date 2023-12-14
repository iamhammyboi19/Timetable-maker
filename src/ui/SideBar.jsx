import styled from "styled-components";
import HeaderLogo from "./HeaderLogo";

const StyledSideBar = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  gap: 2rem;
  border-right: 0.5px solid var(--oc-gray-5);
  height: 100%;

  & a {
    background-color: var(--oc-gray-0);
    padding: 0.5rem 1rem;
  }

  & .active {
    background-color: var(--oc-gray-3);
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: all 0.3s ease;
  }
`;

function SideBar({ children }) {
  return (
    <StyledSideBar>
      <HeaderLogo
        type="sidebar"
        src={"/calendar-clock-time-svgrepo-com.svg"}
        alt={"logo"}
      />
      {children}
    </StyledSideBar>
  );
}

export default SideBar;
