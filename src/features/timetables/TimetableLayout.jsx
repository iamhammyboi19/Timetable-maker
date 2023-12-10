import styled from "styled-components";
import TimetableCardsMain from "./TimetableCardsMain";
import TimetableLayoutTitle from "../../ui/TimetableLayoutTitle";
import GridTemplatesMain from "../../ui/GridTemplatesMain";

const StyledTimetableLayout = styled.div`
  margin: 4rem auto;
  background-color: var(--oc-gray-0);
  max-width: 100rem;
  padding: 1.5rem 0 0 0;
  border-bottom-left-radius: var(--border-radius-lg);
`;

function TimetableLayout({ timetables }) {
  return (
    <StyledTimetableLayout>
      <TimetableLayoutTitle>All timetables</TimetableLayoutTitle>
      <GridTemplatesMain cols={3}>
        {timetables?.map((timetable) => (
          <TimetableCardsMain
            key={timetable.id}
            timetable={timetable}
            timetables={timetables}
          />
        ))}
      </GridTemplatesMain>
    </StyledTimetableLayout>
  );
}

export default TimetableLayout;
