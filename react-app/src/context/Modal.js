import { useContext, useRef, createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const modelRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => setValue(modelRef.current), []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modelRef} />
    </>
  );
};

export const Modal = ({ onClose, children }) => {
  const modalNode = useContext(ModalContext);

  return (
    <>
      modalNode && ReactDOM.createPortal(
      <div id="modal">
        <div id="modal-background" onClick={onClose} />

        <div id="modal-content">{children}</div>
      </div>
      , modalNode )
    </>
  );
};

export default ModalProvider;
