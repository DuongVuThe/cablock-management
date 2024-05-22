import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";
import { useNavigate } from "react-router-dom";

const StyledLogo = styled.div`
  text-align: center;
  position: relative;
`;

const Img = styled.a`
  height: 12rem;
  width: auto;
`;

const Name = styled.p`
  text-transform: uppercase;
  font-size: 2.5rem;
  font-family: "Poetsen One", sans-serif;
  position: absolute;
  top: 80%;
  width: 100%;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";

  const navigate = useNavigate();

  return (
    <StyledLogo>
      <Img
        as="img"
        src={src}
        alt="Logo"
        onClick={() => navigate("/dashboard")}
      />
      <Name>cablock</Name>
    </StyledLogo>
  );
}

export default Logo;
