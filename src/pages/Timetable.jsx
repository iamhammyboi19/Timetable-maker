import styled from "styled-components";
import { useForm } from "react-hook-form";

import TimetableLayout from "../features/timetables/TimetableLayout";

import InnerButton from "../ui/InnerButton";
import Title from "../ui/Title";
import Modal from "../ui/Modal";
import InnerForm from "../ui/InnerForm";
import InnerInput from "../ui/InnerInput";
import RadioInput from "../ui/RadioInput";
import InnerLabelInputDiv from "../ui/InnerLabelInputDiv";
import Select from "../ui/Select";
import { timeOptions } from "../ui/SelectDate";
import { daysOptions } from "../ui/SelectDays";
import FormErrorMessage from "../ui/FormErrorMessage";
import Empty from "../ui/Empty";
import { useUser } from "../features/authentication/useUser";
import { useUpdateTimetableData } from "../features/authentication/useUpdateTimetableData";
import toast from "react-hot-toast";

const StyledTableHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  gap: 2rem;
`;

const InnerRBDiv = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: row;
  margin-bottom: 1.5rem;
`;

function Timetable() {
  const { userTimetables, email } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    // refer to daysModel and timeModel "../ui/SelectDate" and ../ui/SelectDays startTime index 9 is 9:00, endTime index 19 is 19:00
    defaultValues: {
      tableName: "",
      tableType: email?.endsWith("std.neu.edu.tr") ? "NEU" : "custom",
      startDate: 0,
      endDate: 4,
      startTime: 9,
      endTime: 19,
      courses: [],
    },
    mode: "onChange",
  });

  const { updateTimetable, isUpdatingTimetable } = useUpdateTimetableData();

  // const timetables = useSelector((state) => state.timetable.timetables);
  // const dispatch = useDispatch();
  const watchTimetableType = watch("tableType");

  const id = () => "id" + Math.random().toString(16).slice(2);

  function onSubmit(data) {
    const newData = {
      ...data,
      id: id(),
      startDate: +data.startDate,
      endDate: +data.endDate,
      startTime: +data.startTime,
      endTime: +data.endTime,
    };

    const newUserTimetable = [...userTimetables, newData];
    updateTimetable(newUserTimetable, {
      onSuccess: () => {
        toast.success("New timetable successfully created");
      },
      onError: () => {
        toast.error("Error creating new timetable");
      },
    });
  }

  return (
    <>
      <StyledTableHeader>
        <Title as="h2">Timetable</Title>

        <Modal>
          <Modal.Open opens="timetablecreator">
            <InnerButton disabled={isUpdatingTimetable}>
              Create a new timetable
            </InnerButton>
          </Modal.Open>
          <Modal.Window name="timetablecreator">
            <InnerForm
              onSubmit={handleSubmit(onSubmit)}
              reset={reset}
              isLoading={isUpdatingTimetable}
            >
              <Title as="h5">Create a new timetable</Title>
              <div>
                <InnerLabelInputDiv>
                  <label htmlFor="tableName">Timetable Name</label>
                  <InnerInput
                    type="text"
                    id="tableName"
                    {...register("tableName", {
                      required: "Please enter timetable name",
                      minLength: {
                        value: 4,
                        message: "Name must be at least 4 characters",
                      },
                    })}
                  />
                  {errors?.tableName && (
                    <FormErrorMessage>
                      {errors.tableName.message}
                    </FormErrorMessage>
                  )}
                </InnerLabelInputDiv>
                <InnerRBDiv>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <RadioInput
                      id="neutype"
                      value="NEU"
                      {...register("tableType")}
                      type="radio"
                      defaultChecked={email?.endsWith("std.neu.edu.tr")}
                      disabled={!email?.endsWith("std.neu.edu.tr")}
                      title={
                        !email?.endsWith("std.neu.edu.tr") &&
                        "Create an account with NEU student email address to edit"
                      }
                    />
                    <label htmlFor="neutype">NEU Timetable</label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <RadioInput
                      id="customtype"
                      value="custom"
                      {...register("tableType")}
                      type="radio"
                    />
                    <label htmlFor="customtype">Custom Timetable</label>
                  </div>
                </InnerRBDiv>
                {watchTimetableType === "custom" && (
                  <>
                    <InnerRBDiv>
                      <InnerLabelInputDiv nm="no">
                        <label>From day</label>
                        <Select id="startDate" {...register("startDate")}>
                          {daysOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                      </InnerLabelInputDiv>
                      <InnerLabelInputDiv nm="no">
                        <label>To day</label>
                        <Select
                          id="endDate"
                          label="To day"
                          {...register("endDate")}
                        >
                          {daysOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                      </InnerLabelInputDiv>
                    </InnerRBDiv>
                    <InnerRBDiv>
                      <InnerLabelInputDiv nm="no">
                        <label>From time</label>
                        <Select
                          id="startTime"
                          label="From time"
                          {...register("startTime")}
                        >
                          {timeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                      </InnerLabelInputDiv>
                      <InnerLabelInputDiv nm="no">
                        <label>To time</label>
                        <Select
                          id="endTime"
                          label="To time"
                          {...register("endTime")}
                        >
                          {timeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                      </InnerLabelInputDiv>
                    </InnerRBDiv>
                  </>
                )}
              </div>
            </InnerForm>
          </Modal.Window>
        </Modal>
      </StyledTableHeader>

      {userTimetables?.length === 0 ? (
        <Empty>
          You have no timetable ⏰ in the dashboard. Click on create a new
          timetable button to get started 😉. Please refresh the page if added
          timetable doesn't show immediately
        </Empty>
      ) : (
        <TimetableLayout timetables={userTimetables} />
      )}
    </>
  );
}

export default Timetable;
// Access to fetch at 'https://odtijfuiuuxjrqvipqxf.supabase.co/auth/v1/user' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
