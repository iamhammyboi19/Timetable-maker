// import styled from "styled-components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyle from "./styles/GlobalStyles";

import AppLayout from "./ui/AppLayout";

import Account from "./pages/Account";
import Timetable from "./pages/Timetable";
import TimetableData from "./pages/TimetableData";
import Signup from "./pages/Signup";
import ProtectedRoutes from "./features/authentication/ProtectedRoutes";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// import TimeTableContextProvider from "./context/TimeTableContext";

// const HeaderLogoContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-items: center;
//   gap: 0.4rem;
//   margin-bottom: 3rem;

//   & p {
//     font-size: 1.2rem;
//     font-weight: 300;
//     text-transform: uppercase;
//     letter-spacing: 1.2px;
//     color: var(--oc-gray-7);
//   }
// `;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoutes>
                <AppLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Navigate to="/timetable" replace />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/timetable/:timetableid" element={<TimetableData />} />
            <Route path="/account" element={<Account />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
