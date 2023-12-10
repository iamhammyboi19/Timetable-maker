import styled from "styled-components";
import InnerButton from "../ui/InnerButton";
import Title from "../ui/Title";
import Modal from "../ui/Modal";
import InnerForm from "../ui/InnerForm";
import InnerInput from "../ui/InnerInput";
import SelectDate from "../ui/SelectDate";
import SelectDays from "../ui/SelectDays";
import RadioInput from "../ui/RadioInput";
import InnerLabelInputDiv from "../ui/InnerLabelInputDiv";
import TimetableLayout from "../features/timetables/TimetableLayout";
import { useTimetable } from "../context/TimeTableContext";
import { useDispatch, useSelector } from "react-redux";
import { createNewTable } from "../features/timetables/timetableSlice";
import { useForm } from "react-hook-form";
// import FormErrorMessage from "../ui/FormErrorMessage";

// import Empty from "../ui/Empty";

const StyledTableHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
`;

const InnerRBDiv = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: row;
  margin-bottom: 1.5rem;
`;

function Timetable() {
  const { state, dispatch: dispatchFromRed } = useTimetable();
  const { tableName, type, startDate, endDate, startTime, endTime } = state;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const timetable = useSelector((state) => state.timetable);
  const dispatch = useDispatch();

  const id = () => "id" + Math.random().toString(16).slice(2);

  // function handleSubmit() {
  //   console.log(state);
  //   dispatch(createNewTable(state));
  // }

  function onSubmit() {
    //
  }

  return (
    <>
      <StyledTableHeader>
        <Title as="h2">Timetable</Title>

        <Modal>
          <Modal.Open opens="timetablecreator">
            <InnerButton>Create a new timetable</InnerButton>
          </Modal.Open>
          <Modal.Window name="timetablecreator">
            <InnerForm onSubmit={() => handleSubmit(onSubmit)}>
              <Title as="h5">Create a new timetable</Title>
              <div>
                <InnerLabelInputDiv>
                  <label htmlFor="name">Name</label>
                  <InnerInput
                    type="text"
                    id="name"
                    value={tableName}
                    onChange={(e) => {
                      dispatchFromRed({
                        type: "tableName",
                        payload: e.target.value,
                      });
                    }}
                    onBlur={() => {
                      dispatchFromRed({ type: "id", payload: id() });
                    }}
                  />
                </InnerLabelInputDiv>
                <InnerRBDiv>
                  <RadioInput
                    id="NEU"
                    name="tabletype"
                    value="NEU"
                    onChange={(e) => {
                      dispatchFromRed({
                        type: "tabletype",
                        payload: e.target.value,
                      });
                    }}
                    label="NEU Timetable"
                    defaultChecked={true}
                  />
                  <RadioInput
                    id="custom"
                    name="tabletype"
                    value="custom"
                    onChange={(e) => {
                      dispatchFromRed({
                        type: "tabletype",
                        payload: e.target.value,
                      });
                    }}
                    label="Custom Timetable"
                  />
                </InnerRBDiv>
                {type !== "NEU" && (
                  <>
                    {" "}
                    <InnerRBDiv>
                      <SelectDays
                        label="From day"
                        onChange={(e) =>
                          dispatchFromRed({
                            type: "startDate",
                            payload: +e.target.value || 0,
                          })
                        }
                        value={startDate}
                      />
                      <SelectDays
                        label="To day"
                        onChange={(e) =>
                          dispatchFromRed({
                            type: "endDate",
                            payload: +e.target.value || 4,
                          })
                        }
                        value={endDate}
                      />
                    </InnerRBDiv>
                    <InnerRBDiv>
                      <SelectDate
                        onChange={(e) =>
                          dispatchFromRed({
                            type: "startTime",
                            payload: +e.target.value,
                          })
                        }
                        label="From time"
                        value={startTime}
                      />
                      <SelectDate
                        label="To time"
                        onChange={(e) =>
                          dispatchFromRed({
                            type: "endTime",
                            payload: +e.target.value,
                          })
                        }
                        value={endTime}
                      />
                    </InnerRBDiv>
                  </>
                )}
              </div>
            </InnerForm>
          </Modal.Window>
        </Modal>
      </StyledTableHeader>

      {/* <Empty>
        You have no timetable ⏰ in the dashboard . Click on create a new
        timetable button to get started 😉
      </Empty> */}

      <TimetableLayout />
    </>
  );
}

export default Timetable;
