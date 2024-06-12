import { forwardRef } from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  /* width: 25rem; */

  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

const Select = forwardRef(function Select(props, ref) {
  const { value, onChange, options, field, ...otherProps } = props;
  return (
    <StyledSelect {...otherProps} value={value} onChange={onChange} ref={ref}>
      {field && (
        <option hidden value={null}>
          --Please select {field}--
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
});

export default Select;
