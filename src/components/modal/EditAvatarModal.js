import React from "react";
import Modal from "./Modal";

const EditAvatarModal = ({ showModal, setShowModal }) => {
  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <p>hello avatar </p>
      </Modal>
    </>
  );
};

export default EditAvatarModal;
