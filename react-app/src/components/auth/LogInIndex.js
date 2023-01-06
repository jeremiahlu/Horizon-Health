import React, { useState } from "react";
import styles from "./LogIn.module.css";
import LogInForm from "./LogInFormModal";
import { Modal } from "../../context/Modal";

const LoginFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.logInDiv}>
      <button className={styles.logInButton} onClick={() => setShowModal(true)}>
        <i
          className={`${styles.icon} fa-sharp fa-solid fa-right-to-bracket`}
        ></i>
        <div className={styles.iconText} style={{ animationDelay: "0.1s" }}>
          {" "}
          Log in{" "}
        </div>
      </button>
      {/* <p className='signupText'> Don't have an account? </p> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LogInForm />
        </Modal>
      )}
    </div>
  );
};

export default LoginFormModal;
