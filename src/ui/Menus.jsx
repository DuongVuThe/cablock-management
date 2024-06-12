import { createContext, useContext, useEffect, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useCloseOnClickOutside } from "../hooks/useCloseOnClickOutside";
import { autoUpdate, computePosition } from "@floating-ui/react";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const close = () => setOpenId("");
  const open = setOpenId;

  const isOpen = openId !== "";

  useEffect(
    function () {
      const toggle = document.querySelector(`.toggle-${openId}`);
      const float = document.querySelector(`.float-${openId}`);

      if (isOpen && toggle && float) {
        const cleanup = autoUpdate(toggle, float, async function () {
          const computed = await computePosition(toggle, float, {
            placement: "bottom-end",
          });

          Object.assign(float.style, {
            left: `${computed.x}px`,
            top: `${computed.y + 8}px`,
          });
        });
        return cleanup;
      }
    },
    [isOpen, openId]
  );

  return (
    <MenusContext.Provider value={{ openId, close, open }}>
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <div className={`toggle-${id}`}>
        <HiEllipsisVertical />
      </div>
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, close } = useContext(MenusContext);
  const ref = useCloseOnClickOutside(close, false);

  if (openId === "" || openId !== id) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "max-content",
        zIndex: 99,
      }}
      className={`float-${id}`}
    >
      <StyledList ref={ref}>{children}</StyledList>
    </div>
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.List = List;
Menus.Toggle = Toggle;
Menus.Menu = Menu;
Menus.Button = Button;

export default Menus;
