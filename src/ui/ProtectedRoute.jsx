import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { Navigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

function ProtectedRoute({ children }) {
  const screenWidth = screen.width;

  const { isAuthenticated, isPending } = useUser();

  if (isPending)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  if (screenWidth < 1400) return <Navigate to="/device" replace={true} />;

  if (!isAuthenticated) return <Navigate to="/login" replace={true} />;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
