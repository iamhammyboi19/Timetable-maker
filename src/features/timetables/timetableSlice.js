import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timetables: [],
};

export const timetableSlice = createSlice({
  name: " timetable",
  initialState,
  reducers: {
    createNewTable: (state, action) => {
      state.timetables.push(action.payload);
    },
    addNewCourseToCurrentTimetable: (state, action) => {
      state.timetables.map((tables) => {
        if (tables.id === action.payload[0]) {
          const curIndex = tables.courses.findIndex(
            (el) => el.courseId === action.payload[1].courseId
          );
          if (curIndex < 0) return tables;
          tables.courses[curIndex] = action.payload[1];
          return tables;
        }
        return tables;
      });
    },
    fillUpTimeTableWithCoursesOnCreation(state, action) {
      state.timetables.map((tables) => {
        if (tables.id === action.payload[0]) {
          tables.courses = action.payload[1];
          return tables;
        }
        return tables;
      });
    },
    addNeuCourse(state, action) {
      state.timetables.map((tables) => {
        if (tables.id === action.payload[0]) {
          action.payload?.at(1)?.forEach((el) => {
            // tables?.courses?.map((items) => {
            //   if (items?.courseId === el?.courseId) {
            //     console.log(el);
            //     return el;
            //   }
            //   return items;
            // });
            // console.log(tables.courses);
            const index = tables.courses?.findIndex(
              (item) => item?.courseId === el?.courseId
            );
            if (index < 0) return tables;
            tables.courses[index] = el;
            return tables;
          });
        }
        return tables;
      });
    },
  },
});

export const {
  createNewTable,
  addNewCourseToCurrentTimetable,
  fillUpTimeTableWithCoursesOnCreation,
  addNeuCourse,
} = timetableSlice.actions;

export default timetableSlice.reducer;
