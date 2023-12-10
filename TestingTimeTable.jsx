import { useEffect, useState } from "react";
import { getCourse, getCourseTime } from "./services/apiTimetable";

function App() {
  const [course, setCourse] = useState("MTH251");
  useEffect(
    function () {
      async function callme() {
        // check for the searched course code
        const timetable = await getCourse(course);

        // find the current classroom location for the searched result
        const location = timetable?.map((items) => Object.entries(items)[0][1]);

        // map and filter out the days for the searched course
        const tt = timetable?.map((items) =>
          Object.entries(items)?.filter((filtItems) =>
            filtItems[1]?.includes(course)
          )
        );

        // add all days courseName and classroom to individual array [[d,c,class],[d,c,class] ]
        const allResults = [];
        for (let i = 0; i < tt.length; i++) {
          //
          tt[i].forEach((_, index) => {
            tt[i][index].push(location.at(i));
          });
          allResults.push(...tt[i]);
        }

        // loop the results and take out each day on timetable and find the time
        const lectureday = allResults.map((items) => items[0]);

        const lectureTime = await Promise.all(
          lectureday.map(async (courseDay, i) => await getCourseTime(courseDay))
        );

        const eachCourseTime = lectureTime.map(
          (courseTime) => Object.values(courseTime[0])[0]
        );

        const keyDetails = ["day", "courseNameAndProf", "classroom", "time"];

        let courseinfo = [];

        const finalCourseInfo = allResults
          .map((result, i) => {
            result.push(eachCourseTime[i]);
            return result;
          })
          .map((items) => {
            items[1] = items[1].split(" ");
            items[2] = items[2].split(" ").slice(1).join(" ").trim();
            return items;
          });

        for (let j = 0; j < finalCourseInfo.length; j++) {
          const courseObj = { backgroundColor: "#fff" };
          for (let k = 0; k < finalCourseInfo[j].length; k++) {
            courseObj[keyDetails[k]] = finalCourseInfo[j][k];
          }
          courseinfo.push(courseObj);
        }
      }
      callme();
    },
    [course]
  );
  return (
    <>
      <div>WELCOME</div>
    </>
  );
}

export default App;
