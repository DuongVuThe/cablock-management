import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}
    
  ${(props) =>
    props.as === "h5" &&
    css`
      font-size: 2rem;
      font-weight: 500;
      border-top: 1px solid var(--color-grey-200);
      border-bottom: 1px solid var(--color-grey-100);
      padding: 1.2rem 0;
      margin-top: 1rem;
    `}

    line-height: 1.4;
`;

export default Heading;
