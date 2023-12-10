import { timeModel } from "../ui/SelectDate";
import { daysModel } from "../ui/SelectDays";

// gets start and end date from user on create new timetable and returns index of start to end days eg Monday - Friday
// [0,1,2,3,4] refer to daysModels file
export function getAllDays(start, end) {
  //
  const allDays = daysModel.slice(start, end + 1).map((day) => day[1]);
  return allDays;
}

// gets start and end time from user on create new timetable and returns index of start to end time eg 7:00 - 13:00
// [7,8,9,10,11,12,13] refer to timeModel file
export function getAllTime(start, end) {
  const allTime = timeModel.slice(start, end + 1).map((time) => time[1]);
  return allTime;
}

// used for all timetable to create the timetable grid rows and columns
// e.g Monday to friday would be 5 columns
// 7:00 - 13:00 would be 7 rows so 7 * 5 is 35 boxes grid
// courseId starts from 1 so 35 boxes means there are possibilities of 35 courses to be added/edited in the grid
export function createTemporaryCourses(matrix) {
  // const start = 7;
  // const starts = { start };
  // const end = 17;
  // let all = 55;
  // const divBy = end - start + 1;
  return matrix.map((_, i) => {
    // all = all - 1;
    return {
      courseName: "",
      professor: "",
      startsAt: 0,
      //all % divBy === 0 ? (starts.start = start) : starts.start++,
      endsAt: "",
      location: "",
      courseId: i + 1,
    };
  });
}

// MAGIC TADA! restructed the data gotten from neu timetable useFindCourse file
// manipulated the data to have same required key and value as the matrix function above
export function restructureNeuCourse(courseinfo) {
  const neuCourse =
    courseinfo?.length > 0 &&
    courseinfo
      ?.map((el) => ({
        courseName: el.courseNameAndProf?.at(0)?.split("+")[0],
        professor: el.courseNameAndProf?.at(1),
        day: el?.day?.toLowerCase()?.endsWith("day")
          ? el.day
          : el.day.slice(0, -1),
        location: el?.classroom,
        startsAt: el?.time?.split("-")?.at(0),
        endsAt: el?.time?.split("-")?.at(1),
      }))
      .map((item) => {
        return {
          rows:
            timeModel.find((el) => el?.at(1) === item.startsAt)?.at(0) + 1 - 7,
          cols:
            daysModel
              .find(
                (el) => el?.at(1)?.toLowerCase() === item?.day?.toLowerCase()
              )
              ?.at(0) + 1,
          ...item,
        };
      })
      .map((items) => ({
        ...items,
        courseId: 5 * items.rows - items.cols + 1,
      }));

  return neuCourse;
}
