import styled from "styled-components";
import { daysModel } from "../../ui/SelectDays";
import { useNavigate } from "react-router-dom";
import {
  HiEllipsisHorizontalCircle,
  HiEye,
  HiTrash,
  HiXCircle,
} from "react-icons/hi2";
import { useState } from "react";
import { useUser } from "../authentication/useUser";
import { useUpdateTimetableData } from "../authentication/useUpdateTimetableData";
import toast from "react-hot-toast";

const StyledTimeCards = styled.li`
  background-color: var(--oc-gray-2);
  padding: 2rem;
  cursor: pointer;
  transition: all 0.6s ease;
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  gap: 1rem;
  position: relative;

  &:hover {
    background-color: var(--oc-gray-3);
  }
`;

const TimeTableName = styled.h4`
  text-align: center;
  color: var(--oc-gray-9);
  font-size: 1.3rem;
`;

const TableViewDeleteContainer = styled.ul`
  position: absolute;
  right: 1%;
  top: 30%;
  overflow: hidden;

  & li {
    & span {
      font-weight: 300;
      font-size: 1.5rem;
      color: var(--oc-gray-8);
    }

    & button {
      width: 100%;
      padding: 1rem;
      background-color: #fff;
      border: 0.2px solid var(--oc-gray-3);
      display: flex;
      align-items: center;
      gap: 1rem;

      &:hover {
        background-color: var(--oc-gray-1);
        transition: all ease 0.3s;
      }
    }
  }
`;

function TimetableCardsMain({ timetable }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { userTimetables } = useUser();
  const { updateTimetable, isUpdatingTimetable } = useUpdateTimetableData();
  // onClick={() => navigate(`/timetable/${timetable.id}`)}

  function handleDelete(id) {
    const remainingTimetables = userTimetables?.filter(
      (table) => table?.id !== id
    );
    updateTimetable(remainingTimetables, {
      onSuccess: () => {
        toast.success("Timetable successfully deleted");
      },
      onError: () => {
        toast.error("Timetable could not be deleted");
      },
    });
  }

  return (
    <StyledTimeCards>
      <TimeTableName>{timetable?.tableName.toUpperCase()}</TimeTableName>
      <span style={{ position: "absolute", right: "4%", top: "4%" }}>
        {showMenu ? (
          <HiXCircle
            fontSize={25}
            onClick={() => setShowMenu((menu) => !menu)}
          />
        ) : (
          <HiEllipsisHorizontalCircle
            fontSize={25}
            onClick={() => setShowMenu((menu) => !menu)}
          />
        )}
      </span>
      <p
        style={{
          fontSize: "1.3rem",
          fontWeight: 300,
          textAlign: "center",
          color: "#a8a8a8",
        }}
      >
        {daysModel[timetable.startDate]?.at(1)} -{" "}
        {daysModel[timetable.endDate]?.at(1)}
      </p>
      <p
        style={{
          fontSize: "1.3rem",
          fontWeight: 300,
          textAlign: "center",
          color: "#e6e6e6",
          backgroundColor: "#171717",
          display: "inline-block",
          padding: "0.3rem 0.7rem",
          borderRadius: "5px",
        }}
      >
        {timetable?.tableType.toUpperCase()}
      </p>
      {showMenu && (
        <TableViewDeleteContainer aria-disabled={true}>
          <li onClick={() => navigate(`/timetable/${timetable.id}`)}>
            <button disabled={isUpdatingTimetable}>
              <HiEye />
              <span>View</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleDelete(timetable.id)}
              disabled={isUpdatingTimetable}
            >
              <HiTrash />
              <span>Delete</span>
            </button>
          </li>
        </TableViewDeleteContainer>
      )}
    </StyledTimeCards>
  );
}

export default TimetableCardsMain;
