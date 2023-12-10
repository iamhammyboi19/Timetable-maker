import { createContext, useContext, useReducer } from "react";

const TimeTableContext = createContext();

// const [timetableName, setTimetableName] = useState("My timetable");
// const [timetableType, setTimetableType] = useState("NEU");
// const [fromday, setFromday] = useState("");
// const [today, setToday] = useState("");
// const [fromtime, setFromtime] = useState("");
// const [totime, setTotime] = useState("");

const initialState = {
  tableName: "",
  type: "NEU",
  startDate: 0,
  endDate: 4,
  startTime: 7,
  endTime: 17,
  id: "",
  courses: [],
};

//
function reducer(state, action) {
  switch (action.type) {
    case "tableName":
      return { ...state, tableName: action.payload };
    case "tabletype":
      return { ...state, type: action.payload };
    case "startDate":
      return { ...state, startDate: action.payload };
    case "endDate":
      return { ...state, endDate: action.payload };
    case "startTime":
      return { ...state, startTime: action.payload };
    case "endTime":
      return { ...state, endTime: action.payload };
    case "id":
      return { ...state, id: action.payload };
    default:
      throw new Error("Something went wrong");
  }
}

//
function TimeTableContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TimeTableContext.Provider value={{ state, dispatch }}>
      {children}
    </TimeTableContext.Provider>
  );
}

export function useTimetable() {
  const context = useContext(TimeTableContext);

  if (context === undefined)
    throw new Error(
      "TimetableContextProvider was used outside of its provider"
    );

  return context;
}

export default TimeTableContextProvider;
