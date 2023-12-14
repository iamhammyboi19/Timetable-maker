import styled from "styled-components";
import SideBar from "./SideBar";
import MainHeader from "./MainHeader";
import { NavLink, Outlet } from "react-router-dom";
import { HiUserCircle, HiClock, HiBookOpen } from "react-icons/hi2";
import Modal from "./Modal";

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;

  @media (max-width: 56.25em) {
    max-width: 56.25em;
  }
`;

const LayoutContent = styled.div`
  padding: 3rem 4rem;
  margin: 0 auto;

  @media (max-width: 45em) {
    padding: 3rem 3rem;
  }

  @media (max-width: 26.875em) {
    padding: 1.5rem 2rem;
  }
`;

function AppLayout() {
  return (
    <>
      <Layout>
        <SideBar>
          <NavLink to="/account">
            <HiUserCircle fontSize={25} color="#343a40" />
          </NavLink>
          <NavLink to="/timetable">
            <HiClock fontSize={25} color="#343a40" />
          </NavLink>
          <NavLink to="/resetpassword">
            <HiBookOpen fontSize={25} color="#343a40" />
          </NavLink>
        </SideBar>
        <main>
          <MainHeader />
          <LayoutContent>
            <Outlet />
          </LayoutContent>
        </main>
        <Modal />
      </Layout>
    </>
  );
}

export default AppLayout;
