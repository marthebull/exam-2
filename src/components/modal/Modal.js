import React from "react";

const Modal = ({ children, showModal, setShowModal }) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 modal-bg outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-2xl">
              <div className="modal border-0 rounded-sm p-10 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <img
                  src="/images/close-icon.svg"
                  alt="close"
                  className="absolute top-6 right-6 text-black"
                  onClick={() => setShowModal(!showModal)}
                ></img>
                <div>{children}</div>
              </div>
            </div>
            <div
              className=" opacity-25 fixed inset-0 bg-black cursor-pointer"
              onClick={() => setShowModal(!showModal)}
            ></div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
