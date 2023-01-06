import React, { useState } from "react";
import styles from "./SignUp.module.css";
import SignUpForm from "./SignUpFormModal";
import { Modal } from "../../context/Modal";

const SignUpFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.signUpDiv}>
      <button
        className={styles.signUpButton}
        onClick={() => setShowModal(true)}
      >
        <i className={`${styles.icon} fa-solid fa-user-plus`}></i>
        <div className={styles.iconText} style={{ animationDelay: "0.2s" }}>
          Sign up
        </div>
      </button>
      {/* <p className='signupText'> Don't have an account? </p> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </div>
  );
};

export default SignUpFormModal;
