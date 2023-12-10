import { configureStore } from "@reduxjs/toolkit";
import timetableReducer from "../Neu-timetable-webApp/src/features/timetables/timetableSlice";

export const store = configureStore({
  reducer: {
    timetable: timetableReducer,
  },
});
