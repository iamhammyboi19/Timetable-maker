import styled from "styled-components";

const StyledDescription = styled.p`
  font-size: 1.4rem;
  font-weight: 300;
  text-align: center;
  margin-bottom: 1rem;
  letter-spacing: 1.2px;
  color: ${(props) => props.fade === "yes" && "var(--oc-gray-5)"};

  & a,
  a:active,
  a:link {
    color: var(--oc-gray-7);
  }
`;

function DescriptionInForm({ children, fade }) {
  return <StyledDescription fade={fade}>{children}</StyledDescription>;
}

export default DescriptionInForm;
