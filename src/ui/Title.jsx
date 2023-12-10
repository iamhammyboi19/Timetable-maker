import styled, { css } from "styled-components";

const FormTitle = styled.h4`
  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 2rem;
      font-weight: 400;
      margin-bottom: 0.5rem;
    `}

  ${(props) =>
    props.as === "h5" &&
    css`
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
    `}

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      margin-top: 1rem;
      margin-bottom: 3rem;
      color: var(--oc-gray-8);
    `}

    ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      color: var(--oc-gray-8);
    `}
`;

function Title({ as, children }) {
  return <FormTitle as={as}>{children}</FormTitle>;
}

export default Title;
