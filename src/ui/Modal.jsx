import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import InnerButton from "./InnerButton";
import { HiOutlineXMark } from "react-icons/hi2";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--oc-gray-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 2rem 1.5rem 1rem 1.5rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [open, setOpen] = useState("");
  const close = () => setOpen("");
  return (
    <ModalContext.Provider value={{ open, close, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens, children }) {
  const { setOpen } = useContext(ModalContext);
  const handleClick = () => setOpen(opens);
  return cloneElement(children, { onClick: handleClick });
}

function Window({ name, children }) {
  const { open, close } = useContext(ModalContext);

  const ref = useRef(null);

  useEffect(
    function () {
      function handleOutsideClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }

      document.addEventListener("click", handleOutsideClick, true);

      return () =>
        document.removeEventListener("click", handleOutsideClick, true);
    },
    [close]
  );

  if (open !== name) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <span
          style={{
            position: "absolute",
            right: "0%",
            top: "3%",
          }}
        >
          <InnerButton
            onClick={() => close()}
            bg="var(--oc-gray-0)"
            bc="var(--oc-gray-0)"
          >
            <HiOutlineXMark color="#616161" fontSize={20} />
          </InnerButton>
        </span>
        {cloneElement(children, {
          onCloseModal: close,
        })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
