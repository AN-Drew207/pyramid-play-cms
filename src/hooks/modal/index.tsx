import { useCallback, useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ModalReact from "react-modal";

export const useModal = () => {
  const [isShow, setIsShow] = useState<string | boolean>(false);
  const cancelButtonRef = useRef<HTMLDivElement>(null);
  const hide = () => {
    setIsShow(false);
  };

  const show = (state?: string) => {
    setIsShow(state || true);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "20px",
      paddingLeft: "0px",
      paddingRight: "0px",
      paddingTop: "5px",
      paddingBottom: "5px",
      minWidth: "500px",
    },
  };

  const Modal = useCallback(
    ({ children, isShow, withoutX, onClose, noClose }: any) => {
      return (
        <ModalReact
          isOpen={isShow}
          onAfterOpen={() => {}}
          onRequestClose={() => {
            setIsShow(false);
          }}
          contentLabel="Example Modal"
          style={customStyles}
        >
          <div className="w-full min-w-[500px] shrink-0">{children}</div>
        </ModalReact>
      );
    },
    [],
  );

  return { Modal, hide, isShow, show };
};
