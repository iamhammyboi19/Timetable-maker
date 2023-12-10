// import InnerLabelInputDiv from "./InnerLabelInputDiv";
// import Select from "./Select";

// generate select element on create new timetable
const daysOptions = [
  { value: 0, label: "Monday" },
  { value: 1, label: "Tuesday" },
  { value: 2, label: "Wednesday" },
  { value: 3, label: "Thursday" },
  { value: 4, label: "Friday" },
  { value: 5, label: "Saturday" },
  { value: 6, label: "Sunday" },
];

// moving between each array item index[0] or [1] to get required data
const daysModel = [
  [0, "Monday"],
  [1, "Tuesday"],
  [2, "Wednesday"],
  [3, "Thursday"],
  [4, "Friday"],
  [5, "Saturday"],
  [6, "Sunday"],
];

// function SelectDays({ label, id }) {
//   return (
//     <InnerLabelInputDiv>
//       <label>{label}</label>
//       <Select id={id} options={options} />
//     </InnerLabelInputDiv>
//   );
// }

export { daysOptions, daysModel };
