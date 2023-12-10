import styled from "styled-components";

const StyledTimetableLayoutTitle = styled.h5`
  font-weight: 600;
  color: var(--oc-gray-7);
  letter-spacing: 1.1px;
  text-align: center;
  border-bottom: 5px solid var(--oc-gray-0);
  background-color: var(--oc-gray-2);
  padding: 1rem;
  border-top-left-radius: var(--border-radius-lg);
  border-top-right-radius: var(--border-radius-lg);
`;

function TimetableLayoutTitle({ children }) {
  return <StyledTimetableLayoutTitle>{children}</StyledTimetableLayoutTitle>;
}

export default TimetableLayoutTitle;
