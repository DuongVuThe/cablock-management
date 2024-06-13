import styled from "styled-components";
import Heading from "../ui/Heading";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Notice = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

function Device() {
  const screenWidth = screen.width;

  if (screenWidth >= 1400) return <Navigate to={"/dashboard"} replace={true} />;

  return (
    <Notice>
      <Heading as="h1">
        Please use a device with appropriate screen width 📏
      </Heading>
    </Notice>
  );
}

export default Device;
