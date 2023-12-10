import styled from "styled-components";

const EmptyContainer = styled.div`
  margin: 10rem auto;
  background-color: var(--oc-gray-2);
  padding: 3rem;
  display: block;
  border-radius: var(--border-radius-md);
  max-width: 50rem;
  border: 1px solid var(--oc-gray-5);
  border-style: dashed;

  @media (max-width: 26.875em) {
    padding: 2rem;
  }
`;

function Empty({ children }) {
  return (
    <EmptyContainer>
      <p
        style={{
          textAlign: "center",
          letterSpacing: "1px",
          fontSize: "1.4rem",
        }}
      >
        {children}
      </p>
    </EmptyContainer>
  );
}

export default Empty;
