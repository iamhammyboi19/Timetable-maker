// import InnerLabelInputDiv from "./InnerLabelInputDiv";
// import Select from "./Select";

// generate select element on create new timetable
const timeOptions = [
  { value: 0, label: "00:00" },
  { value: 1, label: "01:00" },
  { value: 2, label: "02:00" },
  { value: 3, label: "03:00" },
  { value: 4, label: "04:00" },
  { value: 5, label: "05:00" },
  { value: 6, label: "06:00" },
  { value: 7, label: "07:00" },
  { value: 8, label: "08:00" },
  { value: 9, label: "09:00" },
  { value: 10, label: "10:00" },
  { value: 11, label: "11:00" },
  { value: 12, label: "12:00" },
  { value: 13, label: "13:00" },
  { value: 14, label: "14:00" },
  { value: 15, label: "15:00" },
  { value: 16, label: "16:00" },
  { value: 17, label: "17:00" },
  { value: 18, label: "18:00" },
  { value: 19, label: "19:00" },
  { value: 20, label: "20:00" },
  { value: 21, label: "21:00" },
  { value: 22, label: "22:00" },
  { value: 23, label: "23:00" },
];

// moving between each array item index[0] or [1] to get required data
const timeModel = [
  [0, "00:00"],
  [1, "01:00"],
  [2, "02:00"],
  [3, "03:00"],
  [4, "04:00"],
  [5, "05:00"],
  [6, "06:00"],
  [7, "07:00"],
  [8, "08:00"],
  [9, "09:00"],
  [10, "10:00"],
  [11, "11:00"],
  [12, "12:00"],
  [13, "13:00"],
  [14, "14:00"],
  [15, "15:00"],
  [16, "16:00"],
  [17, "17:00"],
  [18, "18:00"],
  [19, "19:00"],
  [20, "20:00"],
  [21, "21:00"],
  [22, "22:00"],
  [23, "23:00"],
];

// function SelectDate({ label, id }) {
//   return (
//     <InnerLabelInputDiv>
//       <label>{label}</label>
//       <Select id={id} options={options} />
//     </InnerLabelInputDiv>
//   );
// }

export { timeOptions, timeModel };
