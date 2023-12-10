import styled from "styled-components";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useUpdateTimetableData } from "../authentication/useUpdateTimetableData";
import { useUser } from "../authentication/useUser";

import Modal from "../../ui/Modal";
import InnerForm from "../../ui/InnerForm";
import InnerLabelInputDiv from "../../ui/InnerLabelInputDiv";
import InnerInput from "../../ui/InnerInput";
import Title from "../../ui/Title";
import Select from "../../ui/Select";
import { timeModel, timeOptions } from "../../ui/SelectDate";

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
  height: 12.45rem;

  &:hover {
    background-color: var(--oc-gray-3);
  }

  @media (max-width: 56.625em) {
    padding: 1rem;
  }

  @media (max-width: 48.875em) {
    padding: 0.5rem;
    height: 9rem;
    gap: 0.5rem;
  }
`;

const InnerRBDiv = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: row;
`;

const TimeTableName = styled.h4`
  text-align: center;
  color: var(--oc-gray-9);
  font-size: 1.3rem;

  @media (max-width: 48.875em) {
    font-size: 1rem;
  }
`;

const P = styled.p`
  font-size: 1.3rem;
  font-weight: 300;
  text-align: center;
  color: #a8a8a8;

  @media (max-width: 48.875em) {
    font-size: 1rem;
  }
`;

const P2 = styled.p`
  font-size: 1.3rem;
  font-weight: 300;
  text-align: center;
  color: #e6e6e6;
  background-color: var(--oc-black);
  display: inline-block;
  padding: 0.3rem 0.7rem;
  border-radius: var(--border-radius-sm);

  @media (max-width: 48.875em) {
    font-size: 1rem;
    padding: 0.2rem 0.6rem;
  }
`;

function TimetableCardSub({ courseData, timetable }) {
  const { updateTimetable, isUpdatingTimetable } = useUpdateTimetableData();
  const { userTimetables } = useUser();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      courseId: courseData.courseId,
      professor: courseData.professor,
      startsAt: courseData.startsAt,
      location: courseData.location,
      courseName: courseData.courseName,
    },
  });

  function updateCourse(id, newdata) {
    const newtimetable = userTimetables.map((tables) => {
      if (tables.id === id) {
        const curIndex = tables.courses.findIndex(
          (el) => el.courseId === newdata.courseId
        );
        if (curIndex < 0) return tables;
        tables.courses[curIndex] = newdata;
        return tables;
      }
      return tables;
    });

    updateTimetable(newtimetable, {
      onSuccess: () => {
        toast.success(`Course #${newdata.courseId} successfully updated`);
      },
      onError: () => {
        toast.error("Error updating course");
      },
    });
  }

  function onSubmit(data) {
    const endsAt =
      +data.startsAt === 23
        ? timeModel[0][1]
        : timeModel[+data.startsAt + 1][1];
    const startsAt = timeModel[+data.startsAt][1];
    const newData = { ...data, startsAt, endsAt };
    updateCourse(timetable.id, newData);
  }

  return (
    <>
      <Modal>
        <Modal.Open opens="createOrEditCourse">
          <StyledTimeCards disabled={isUpdatingTimetable}>
            <TimeTableName>
              {courseData?.courseName.toUpperCase() || " "}
              {courseData?.professor && ` (${courseData?.professor})`}
            </TimeTableName>
            <P>
              {courseData?.startsAt || " "}
              {(courseData?.endsAt && ` - ${courseData?.endsAt}`) || " "}
            </P>
            {courseData?.location && <P2>{courseData?.location}</P2>}
            {courseData.courseId === 1 && !courseData?.location && (
              <P2>{"click to edit"}</P2>
            )}
          </StyledTimeCards>
        </Modal.Open>
        <Modal.Window name="createOrEditCourse">
          <InnerForm onSubmit={handleSubmit(onSubmit)}>
            <Title as="h2">Course #{courseData.courseId}</Title>
            <InnerRBDiv>
              <InnerLabelInputDiv nm="no">
                <label>Course ID</label>
                <InnerInput disabled={true} value={courseData.courseId} />
              </InnerLabelInputDiv>

              <InnerLabelInputDiv nm="no">
                <label>Course Name</label>
                <InnerInput
                  defaultValue={courseData.courseName}
                  {...register("courseName")}
                />
              </InnerLabelInputDiv>
            </InnerRBDiv>
            <InnerRBDiv>
              <InnerLabelInputDiv nm="no">
                <label>Professor</label>
                <InnerInput
                  defaultValue={courseData.professor}
                  {...register("professor")}
                />
              </InnerLabelInputDiv>
              <InnerLabelInputDiv nm="no">
                <label>Location</label>
                <InnerInput
                  defaultValue={courseData.location}
                  {...register("location")}
                />
              </InnerLabelInputDiv>
            </InnerRBDiv>
            <InnerRBDiv>
              <InnerLabelInputDiv nm="no">
                <label htmlFor="starttime">Starts At</label>
                <Select id="starttime" {...register("startsAt")}>
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </InnerLabelInputDiv>
            </InnerRBDiv>
          </InnerForm>
        </Modal.Window>
      </Modal>
    </>
  );
}

export default TimetableCardSub;
