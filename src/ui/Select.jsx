import styled from "styled-components";

const Select = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white" ? "var(--oc-gray-1)" : "var(--oc-gray-3)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--oc-gray-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  width: 100%;

  &:focus {
    outline: none;
  }
`;

// function Select({ options, id }) {
//   return (
//     <StyledSelect id={id} type="notwhite">
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </StyledSelect>
//   );
// }

export default Select;
