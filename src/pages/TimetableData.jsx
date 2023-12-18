import styled, { css } from "styled-components";

import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";
import { HiArrowDownTray } from "react-icons/hi2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { useFindCourse } from "../features/timetables/useFindCourse";

import {
  createTemporaryCourses,
  getAllDays,
  getAllTime,
  restructureNeuCourse,
} from "../helpers/helpers";

import Title from "../ui/Title";
import InnerButton from "../ui/InnerButton";
import TimetableLayoutTitle from "../ui/TimetableLayoutTitle";
import Modal from "../ui/Modal";
import InnerForm from "../ui/InnerForm";
import InnerLabelInputDiv from "../ui/InnerLabelInputDiv";
import InnerInput from "../ui/InnerInput";
import TimetableCardSub from "../features/timetables/TimetableCardSub";
import { useUser } from "../features/authentication/useUser";
import { useUpdateTimetableData } from "../features/authentication/useUpdateTimetableData";
import GridTemplatesSub from "../ui/GridTemplatesSub";

// import Spinner from "../ui/Spinner";

const StyledTableHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  margin-bottom: 3rem;
`;

const Days = styled.ul`
  display: grid;
  gap: 2rem;
  ${(props) =>
    props.cols
      ? css`
          grid-template-columns: repeat(${props.cols}, 1fr);
        `
      : ""}

  ${(props) =>
    props.rows
      ? css`
          grid-template-rows: repeat(${props.rows}, 1fr);
        `
      : ""}
`;

const DownloadBtn = styled.button`
  display: flex;
  align-items: center;
  justify-items: center;
  padding: 1rem;
  gap: 0.5rem;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: 2rem;
  font-weight: 600;
  background-color: var(--oc-gray-3);
  border: 0.3px solid var(--oc-gray-9);
  border-radius: var(--border-radius-sm);

  &:hover {
    background-color: var(--oc-gray-2);
    transition: all 0.3s ease;
  }
`;

const TableWrapper = styled.div`
  padding: 2rem;
  position: relative;
  /* @media (max-width: 56.625em) {
    padding: 0.5rem;
  } */
`;

function TimetableData() {
  const navigate = useNavigate();
  const { userTimetables: timetables } = useUser();
  const [courseCodeSearch, setCourseCodeSearch] = useState("");
  const { findCourse, stateCourseInfo, setStateCourseInfo, isLoadingCourse } =
    useFindCourse(courseCodeSearch);
  const { updateTimetable } = useUpdateTimetableData();
  const pdfRef = useRef(null);

  // GET CURRENT TABLE

  // GET CURRENT TABLE ID FROM CUURENT URL AND FILTER
  const { timetableid } = useParams();
  const timetable = timetables
    ?.filter((table) => table.id === timetableid)
    ?.at(0);

  // GET ALL DAYS STARTING INDEX AND ENDING INDEX
  // this looks like a rows x columns matrix refer to createTemporaryCourses in helpers file
  const allDays = getAllDays(timetable?.startDate, timetable?.endDate);
  const allTimes = getAllTime(timetable?.startTime, timetable?.endTime);

  // CALCULATE DAYS(COLUMNS) AND EACH TIME (ROWS)
  const calcTableDataRange = allDays?.length * (allTimes?.length - 1);
  const matrix = Array.from({ length: calcTableDataRange }, (v, i) => i);
  const eachCourseMaxtrix =
    timetable.courses.length > 0
      ? timetable.courses
      : createTemporaryCourses(matrix);

  // update courses on load -> due to number of days/hours
  // if a new user try to click on a newly created timetable
  // by default the timetable courses are empty this fill up the courses array based on the rows and cols
  // refer to createTemporaryCourses in helpers.js file
  useEffect(
    function () {
      if (timetable && timetable.courses.length === 0) {
        timetables.map((table) => {
          if (table.id === timetableid) {
            table.courses = eachCourseMaxtrix;
            return table;
          }
          return table;
        });
        updateTimetable(timetables, {
          onSuccess: (timetables) => {
            toast.success("Timetable successfully loaded");
          },
        });
      }
    },
    [timetables, timetableid, eachCourseMaxtrix, timetable, updateTimetable]
  );

  function handlePDFdownload() {
    const input = pdfRef.current;
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "px", "a4", false);
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        // pdf.save('download.pdf');
        pdf.save(`mytimetable_${timetableid}.pdf`);
      })
      .catch((err) => toast.error("Unable to download timetable pdf"));
  }

  // used useCallback to check why I am getting infinite loop re-renders
  const restructureNeuCourseWrapped = useCallback(restructureNeuCourse, []);

  // restructure neu course data if the course found is the same with the autogenerated one from the matrix
  // the function of this is to find the courseId and replace it then update the timetables array in supabase
  useEffect(
    function () {
      if (timetable.tableType === "NEU" && stateCourseInfo.length > 0) {
        const neucourse = restructureNeuCourseWrapped(stateCourseInfo);
        neucourse &&
          neucourse?.forEach((items) => {
            const findcourseindex = timetable.courses.findIndex((course) => {
              if (course.courseId === items.courseId) {
                if (course.courseName.length > 0) {
                  toast.success(
                    `Opps looks like you have a clash with ${course.courseName}`,
                    {
                      duration: 6000,
                    }
                  );
                }
                return true;
              }
              return course.courseId === items.courseId;
            });
            timetable.courses[findcourseindex] = items;
          });
        const findcurtableindex = timetables.findIndex(
          (table) => table.id === timetableid
        );
        timetables[findcurtableindex] = timetable;
        updateTimetable(timetables, {
          onSuccess: () => {
            toast.success(
              "NEU Timetable successfully reconstructed scroll to view",
              {
                position: "top-right",
                duration: 4000,
              }
            );
          },
          onError: () => {
            toast.error("Error reconstructing NEU timetable", {
              position: "bottom-left",
            });
          },
        });
        setCourseCodeSearch("");
        setStateCourseInfo([]);
      }
    },
    [
      timetable.tableType,
      stateCourseInfo,
      timetable.courses,
      timetableid,
      timetables,
      timetable,
      updateTimetable,
      restructureNeuCourseWrapped,
      setStateCourseInfo,
    ]
  );

  // handle neu course search
  function handleSubmit() {
    if (courseCodeSearch.length >= 6 && stateCourseInfo.length === 0) {
      findCourse(courseCodeSearch, {
        onSuccess: () => {
          toast.success(`Adding ${courseCodeSearch} to the timetable`);
          setCourseCodeSearch("");
        },
        onError: () => {
          toast.error(`Course code "${courseCodeSearch}" not found`);
          setCourseCodeSearch("");
        },
      });
    }
  }

  return (
    <div>
      <StyledTableHeader>
        <Title as="h2">{timetable?.tableName?.toUpperCase()}</Title>
        <div style={{ display: "flex", gap: "2rem" }}>
          <Modal>
            <InnerButton
              bg="var(--oc-gray-1)"
              tc="var(--oc-gray-9)"
              bc="var(--oc-gray-4)"
              oh="var(--oc-gray-6)"
              onClick={() => navigate(-1)}
            >
              &larr; Back
            </InnerButton>
            <Modal.Open opens="addcourse">
              {timetable?.tableType === "NEU" ? (
                <InnerButton disabled={isLoadingCourse}>
                  &#8889; Add course
                </InnerButton>
              ) : (
                <span></span>
              )}
            </Modal.Open>
            <Modal.Window name="addcourse">
              <InnerForm onSubmit={handleSubmit}>
                <Title>Course Code</Title>
                <InnerLabelInputDiv>
                  <label>Course Code</label>
                  <InnerInput
                    type="text"
                    id="coursecode"
                    value={courseCodeSearch}
                    onChange={(e) => {
                      setCourseCodeSearch(e.target.value.toUpperCase());
                    }}
                  />
                  <p style={{ marginTop: "1rem", fontSize: "1.3rem" }}>
                    e.g ECC201
                  </p>
                </InnerLabelInputDiv>
              </InnerForm>
            </Modal.Window>
          </Modal>
        </div>
      </StyledTableHeader>

      {/* LOAD CUSTOM TIMETABLE IF CUSTOM */}
      {timetable.tableType === "custom" && (
        <TableWrapper ref={pdfRef}>
          <TimetableLayoutTitle>
            <Days cols={allDays.length}>
              {allDays.map((day) => (
                <li key={day}>{day}</li>
              ))}
            </Days>
          </TimetableLayoutTitle>

          <GridTemplatesSub
            cols={allDays.length}
            rows={allTimes.length - 1}
            allTimes={allTimes}
          >
            {eachCourseMaxtrix.map((data) => (
              <TimetableCardSub
                key={data.courseId}
                courseData={data}
                timetable={timetable}
              />
            ))}
          </GridTemplatesSub>
        </TableWrapper>
      )}

      {/* LOAD NEU TIMETABLE IF NEU */}
      {timetable.tableType === "NEU" && (
        <TableWrapper ref={pdfRef}>
          <TimetableLayoutTitle>
            <Days cols={allDays.length}>
              {allDays.map((day) => (
                <li key={day}>{day}</li>
              ))}
            </Days>
          </TimetableLayoutTitle>

          <GridTemplatesSub
            cols={allDays.length}
            rows={allTimes.length - 1}
            allTimes={allTimes}
          >
            {timetable.courses.map((data) => (
              <TimetableCardSub
                key={data.courseId}
                courseData={data}
                timetable={timetable}
              />
            ))}
          </GridTemplatesSub>
        </TableWrapper>
      )}
      <DownloadBtn onClick={handlePDFdownload}>
        <HiArrowDownTray fontSize={20} />
        Download PDF
      </DownloadBtn>
    </div>
  );
}

export default TimetableData;
