const options = [
  { value: 0, label: "Monday" },
  { value: 1, label: "Tuesday" },
  { value: 2, label: "Wednesday" },
  { value: 3, label: "Thursday" },
  { value: 4, label: "Friday" },
  { value: 5, label: "Saturday" },
  { value: 6, label: "Sunday" },
];

const res = options.map((items) => [items.value, items.label]);

console.log(res);

const ans = [
  [0, "Monday"],
  [1, "Tuesday"],
  [2, "Wednesday"],
  [3, "Thursday"],
  [4, "Friday"],
  [5, "Saturday"],
  [6, "Sunday"],
];

const initialState = {
  timetables: [
    {
      tableName: "class timetable",
      id: "randomId",
      startDate: "Monday",
      endDate: "Friday",
      startTime: "7:00",
      endTime: "16:00",
      type: "custom",
      courses: [
        {
          courseCode: "ECC201",
          startHour: "7:00",
          endHour: "9:00",
          day: "Monday",
          lecturerName: "USMAN",
          id: "randomId",
        },
      ],
    },
  ],
};

const timetabless = {
  tableName: "class timetable",
  id: "randomId",
  startDate: "Monday",
  endDate: "Friday",
  startTime: "7:00",
  endTime: "16:00",
  type: "custom",
  courses: [],
};

const courses = {
  courseCode: "",
  startHour: "",
  endHour: "",
  day: "",
  lecturerName: "",
  id: "",
  backgroundColor: "",
};

// const days =
//   "SALON,LOCATION,CAPACITY,CLASSPROJECTION,MONDAY,MONDAY1,MONDAY2,MONDAY3,MONDAY4,MONDAY5,MONDAY6,MONDAY7,MONDAY8,MONDAY9,MONDAY10,TUESDAY,TUESDAY1,TUESDAY2,TUESDAY3,TUESDAY4,TUESDAY5,TUESDAY6,TUESDAY7,TUESDAY8,TUESDAY9,TUESDAY10,WEDNESDAY,WEDNESDAY1,WEDNESDAY2,WEDNESDAY3,WEDNESDAY4,WEDNESDAY5,WEDNESDAY6,WEDNESDAY7,WEDNESDAY8,WEDNESDAY9,WEDNESDAY10,THURSDAY,THURSDAY1,THURSDAY2,THURSDAY3,THURSDAY4,THURSDAY5,THURSDAY6,THURSDAY7,THURSDAY8,THURSDAY9,THURSDAY10,FRIDAY,FRIDAY1,FRIDAY2,FRIDAY3,FRIDAY4,FRIDAY5,FRIDAY6,FRIDAY7,FRIDAY8,FRIDAY9,FRIDAY10,SATURDAY,SATURDAY1,SATURDAY2,SATURDAY3,SATURDAY4,SATURDAY5,SATURDAY6,SATURDAY7,SATURDAY8,SATURDAY9,SUNDAY,SUNDAY1,SUNDAY2,SUNDAY3,SUNDAY4,SUNDAY5,SUNDAY6,SUNDAY7,SUNDAY8".split(
//     ","
//   );

// const times =
//   "no data,no data,no data,no data,09:00-09:50,10:00-10:50,11:00-11:50,12:00-12:50,13:00-13:50,14:00-14:50,15:00-15:50,16:00-16:50,17:00-17:50,18:00-18:50,19:00-19:50,09:00-09:50,10:00-10:50,11:00-11:50,12:00-12:50,13:00-13:50,14:00-14:50,15:00-15:50,16:00-16:50,17:00-17.50,18:00-18:50,19:00-19:50,09:00-09:50,10:00-10:50,11:00-11:50,12:00-12:50,13:00-13:50,14:00-14:50,15:00-15:50,16:00-16:50,17:00-17.50,18:00-18:50,19:00-19:50,09:00-09:50,10:00-10:50,11:00-11:50,12:00-12:50,13:00-13:50,14:00-14:50,15:00-15:50,16:00-16:50,17:00-17.50,18:00-18:50,19:00-19:50,09:00-09:50,10:00-10:50,11:00-11:50,12:00-12:50,13:00-13:50,14:00-14:50,15:00-15:50,16:00-16:50,17:00-17.50,18:00-18:50,19:00-19:50,09:00-09:50,10:00-10:50,11:00-11:50,12:00-12:50,13:00-13:50,14:00-14:50,15:00-15:50,16:00-16:50,17:00-17.50,18:00-18:50,09:00-09:50,10:00-10:50,11:00-11:50,12:00-12:50,13:00-13:50,14:00-14:50,15:00-15:50,16:00-16:50,17:00-17.50".split(
//     ","
//   );

const days = [
  "SALON",
  "LOCATION",
  "CAPACITY",
  "CLASSPROJECTION",
  "MONDAY",
  "MONDAY1",
  "MONDAY2",
  "MONDAY3",
  "MONDAY4",
  "MONDAY5",
  "MONDAY6",
  "MONDAY7",
  "MONDAY8",
  "MONDAY9",
  "MONDAY10",
  "TUESDAY",
  "TUESDAY1",
  "TUESDAY2",
  "TUESDAY3",
  "TUESDAY4",
  "TUESDAY5",
  "TUESDAY6",
  "TUESDAY7",
  "TUESDAY8",
  "TUESDAY9",
  "TUESDAY10",
  "WEDNESDAY",
  "WEDNESDAY1",
  "WEDNESDAY2",
  "WEDNESDAY3",
  "WEDNESDAY4",
  "WEDNESDAY5",
  "WEDNESDAY6",
  "WEDNESDAY7",
  "WEDNESDAY8",
  "WEDNESDAY9",
  "WEDNESDAY10",
  "THURSDAY",
  "THURSDAY1",
  "THURSDAY2",
  "THURSDAY3",
  "THURSDAY4",
  "THURSDAY5",
  "THURSDAY6",
  "THURSDAY7",
  "THURSDAY8",
  "THURSDAY9",
  "THURSDAY10",
  "FRIDAY",
  "FRIDAY1",
  "FRIDAY2",
  "FRIDAY3",
  "FRIDAY4",
  "FRIDAY5",
  "FRIDAY6",
  "FRIDAY7",
  "FRIDAY8",
  "FRIDAY9",
  "FRIDAY10",
  "SATURDAY",
  "SATURDAY1",
  "SATURDAY2",
  "SATURDAY3",
  "SATURDAY4",
  "SATURDAY5",
  "SATURDAY6",
  "SATURDAY7",
  "SATURDAY8",
  "SATURDAY9",
  "SUNDAY",
  "SUNDAY1",
  "SUNDAY2",
  "SUNDAY3",
  "SUNDAY4",
  "SUNDAY5",
  "SUNDAY6",
  "SUNDAY7",
  "SUNDAY8",
];

const times = [
  "no data",
  "no data",
  "no data",
  "no data",
  "09:00-09:50",
  "10:00-10:50",
  "11:00-11:50",
  "12:00-12:50",
  "13:00-13:50",
  "14:00-14:50",
  "15:00-15:50",
  "16:00-16:50",
  "17:00-17:50",
  "18:00-18:50",
  "19:00-19:50",
  "09:00-09:50",
  "10:00-10:50",
  "11:00-11:50",
  "12:00-12:50",
  "13:00-13:50",
  "14:00-14:50",
  "15:00-15:50",
  "16:00-16:50",
  "17:00-17.50",
  "18:00-18:50",
  "19:00-19:50",
  "09:00-09:50",
  "10:00-10:50",
  "11:00-11:50",
  "12:00-12:50",
  "13:00-13:50",
  "14:00-14:50",
  "15:00-15:50",
  "16:00-16:50",
  "17:00-17.50",
  "18:00-18:50",
  "19:00-19:50",
  "09:00-09:50",
  "10:00-10:50",
  "11:00-11:50",
  "12:00-12:50",
  "13:00-13:50",
  "14:00-14:50",
  "15:00-15:50",
  "16:00-16:50",
  "17:00-17.50",
  "18:00-18:50",
  "19:00-19:50",
  "09:00-09:50",
  "10:00-10:50",
  "11:00-11:50",
  "12:00-12:50",
  "13:00-13:50",
  "14:00-14:50",
  "15:00-15:50",
  "16:00-16:50",
  "17:00-17.50",
  "18:00-18:50",
  "19:00-19:50",
  "09:00-09:50",
  "10:00-10:50",
  "11:00-11:50",
  "12:00-12:50",
  "13:00-13:50",
  "14:00-14:50",
  "15:00-15:50",
  "16:00-16:50",
  "17:00-17.50",
  "18:00-18:50",
  "09:00-09:50",
  "10:00-10:50",
  "11:00-11:50",
  "12:00-12:50",
  "13:00-13:50",
  "14:00-14:50",
  "15:00-15:50",
  "16:00-16:50",
  "17:00-17.50",
];

const combo = days.map((items, i) => [items, times[i]]);

console.log(combo);
