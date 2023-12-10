import styled, { css } from "styled-components";

const StyledHeaderLogo = styled.img`
  ${(props) =>
    props.type === "sidebar" &&
    css`
      height: 4rem;
      max-width: 4rem;
      padding-bottom: 1rem;
      margin-bottom: 2rem;
      border-bottom: 1px solid var(--oc-gray-5);
    `}
`;

function HeaderLogo({ type, src, alt }) {
  return <StyledHeaderLogo type={type} src={src} alt={alt} />;
}

export default HeaderLogo;
