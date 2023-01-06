import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditReviewForm from "./EditReviewForm";
import styles from "./Reviews.module.css";

function EditReviewModal({ review }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <i
        className="fa-regular fa-pen-to-square"
        onClick={() => setShowModal(true)}
      ></i>
      {/* <button
        className="dash-edit-expense-modal"
        onClick={() => setShowModal(true)}
      >
        Edit comment
      </button> */}
      {showModal && (
        <Modal className={styles.editModal} onClose={() => setShowModal(false)}>
          <EditReviewForm review={review} onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default EditReviewModal;
