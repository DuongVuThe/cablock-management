import styled, { css } from "styled-components";

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);

  ${(props) =>
    props.role &&
    css`
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.4rem;
      font-family: "Sono";
      &:hover {
        background-color: var(--color-red-100);
        cursor: pointer;
      }
    `}
`;

export default Tag;
