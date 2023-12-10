import { useMutation } from "@tanstack/react-query";
import { getCourse } from "../../services/apiTimetable";
import { useEffect, useState } from "react";
import { combo } from "./combo";

// to get better understanding of each data been manipulated use console.log("data name", actual data);
// first useMutation finds the course code from supabase
// second useQueries find the time based on the current day eg MONDAY7 lecture time is always 16:00 - 16:50
// then i find a way to join each data together so each course Object can have keys of ["day", "courseNameAndProf", "classroom", "time"];

//
export function useFindCourse(course) {
  // query for timetable... had to use useMutation because I really need the mutate function conditionally and had no other choice
  let {
    data: timetable,
    isLoading: isLoadingCourse,
    mutate: findCourse,
  } = useMutation({
    mutationFn: getCourse,
  });

  // find the current classroom location for the searched result
  const location = timetable?.map((items) => Object.entries(items)[0][1]);

  // had to use this so i can set courseinfo variable back to []
  // timetable.tableType === "NEU" && stateCourseInfo.length > 0 so I can stop infinite re-renders
  const [stateCourseInfo, setStateCourseInfo] = useState([]);

  // i want to make sure after neu students search their course code i set it back to ""
  // so i checked if course code search is >= 6 letters and clear the input because of infinite re-render
  // i use this to receive the course because it is needed here to complete data restructure
  const [receiveCourse, setReceiveCourse] = useState("");

  // map and filter out the days for the searched course

  useEffect(
    function () {
      if (course.length > 5) {
        console.log("setme");
        setReceiveCourse(course);
      }
    },
    [course]
  );

  useEffect(
    function () {
      if (timetable?.length > 0) {
        const tt = timetable?.map((items) =>
          Object.entries(items)?.filter(
            (filtItems) =>
              filtItems[1]?.includes(receiveCourse.toUpperCase()) === true
          )
        );

        timetable.length = 0;

        // add all days courseName and classroom to individual array [[d,c,class],[d,c,class] ]
        const allResults = [];
        for (let i = 0; i < tt?.length; i++) {
          //
          tt[i].forEach((_, index) => {
            tt[i][index]?.push(location.at(i));
          });
          allResults?.push(...tt[i]);
        }

        // loop the results and take out each day on timetable and find the time
        const lectureday = allResults?.map((items) => items[0]);

        // ************************************************************************************

        // check combo.js file I filtered the time based on the current day
        const dataResults = lectureday
          ?.map((courseDay) =>
            combo.filter((el) => el[0] === courseDay && el[1])
          )
          ?.map((el) => el?.at(0)?.at(1));

        const keyDetails = ["day", "courseNameAndProf", "classroom", "time"];

        let courseinfo = [];

        const finalCourseInfo = allResults
          ?.map((result, i) => {
            result?.push(dataResults[i]);
            return result;
          })
          ?.map((items) => {
            items[1] = items[1]?.split(" ");
            items[2] = items[2]?.split(" ").slice(1).join(" ").trim();
            return items;
          });

        for (let j = 0; j < finalCourseInfo?.length; j++) {
          const courseObj = {};
          for (let k = 0; k < finalCourseInfo[j].length; k++) {
            courseObj[keyDetails[k]] = finalCourseInfo[j][k];
          }
          courseinfo?.push(courseObj);
        }

        if (courseinfo.length > 0)
          setStateCourseInfo((cur) => [...cur, ...courseinfo]);
      }
    },
    [location, receiveCourse, timetable]
  );

  return {
    isLoadingCourse,
    findCourse,
    stateCourseInfo,
    setStateCourseInfo,
  };
}
