import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import styles from "./SignUp.module.css";
import { LogInFormModal } from "./LogInFormModal";

const SignUpForm = ({ LogInFormModal }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [previewPicture, setPreviewPicture] = useState();
  const inputRef = useRef(null);
  // const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const handleUpload = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handlePreview = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const files = Object.values(e.target.files);
    const types = files.map((file) => ({
      file: new Blob([file]),
    }));
    const url = types.map(({ file }) => {
      return {
        url: URL.createObjectURL(file),
      };
    });
    setPreviewPicture(url);
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(
          username,
          firstName,
          lastName,
          email,
          address,
          password,
          profilePicture
        )
      );
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateAddress = (e) => {
    setAddress(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateProfilePicture = (e) => {
    setProfilePicture(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <form className={styles.signUpForm} onSubmit={onSignUp}>
        <div className={styles.header}>
          <img
            className={styles.lock}
            src="https://cdn.pixabay.com/photo/2017/03/19/03/47/material-icon-2155441_960_720.png"
          />
          <span>Sign up</span>
        </div>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>

        <div className={styles.main}>
          <form className={styles.imageForm}>
            <img
              className={styles.image}
              src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
              alt="song image"
            />

            <div className={styles.addImage}>
              <span className={styles.addImageText}>
                Attach an image or PDF:
              </span>
              <button className={styles.chooseFile}>
                <input
                  className={styles.fileInput}
                  type="file"
                  ref={inputRef}
                  multiple
                  accept={"image/*"}
                  onInput={handlePreview}
                  onChange={updateProfilePicture}
                />
              </button>
            </div>
          </form>

          <div className={styles.mainForm}>
            <div>
              <input
                className={styles.input}
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
                placeholder="Username"
              ></input>
            </div>
            <div>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                onChange={updateFirstName}
                value={firstName}
                placeholder="First Name"
              ></input>
            </div>
            <div>
              <input
                className={styles.input}
                type="text"
                name="lastName"
                onChange={updateLastName}
                value={lastName}
                placeholder="Last Name"
              ></input>
            </div>
            <div>
              <input
                className={styles.input}
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
                placeholder="Email Address"
              ></input>
            </div>
            <div>
              <input
                className={styles.input}
                type="text"
                name="address"
                onChange={updateAddress}
                value={address}
                placeholder="Address"
              ></input>
            </div>
          </div>
        </div>
        <div className={styles.password}>
          <div>
            <input
              className={styles.inputPassword}
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              placeholder="Password"
            ></input>
          </div>
          <div>
            <input
              className={styles.inputPassword}
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              placeholder="Repeat Password"
            ></input>
          </div>
        </div>
        <button className={styles.submit} type="submit">
          SIGN UP
        </button>
        {/* <NavLink className={styles.login} to={LogInFormModal}>
          Already have an account? Sign in
        </NavLink> */}
        <span className={styles.copyright}>
          Copyright © Horizon Health 2022.{" "}
        </span>
      </form>
    </>
  );
};

export default SignUpForm;
