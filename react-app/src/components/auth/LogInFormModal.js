import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import styles from "./LogIn.module.css";
import { SignUpFormModal } from "./SignUpFormModal";

const LoginForm = ({ SignUpFormModal }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleGuestLogin = (e) => {
    e.preventDefault();

    return setEmail("demo@aa.io"), setPassword("password");
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form className={styles.logInForm} onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className={styles.header}>
        <img
          className={styles.lock}
          src="https://cdn.pixabay.com/photo/2017/03/19/03/47/material-icon-2155441_960_720.png"
        />
        <span>Log In</span>
      </div>
      <div className={styles.main}>
        <div>
          <input
            className={styles.input}
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <input
            className={styles.input}
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button className={styles.submit} type="submit">
          LOG IN
        </button>
        <button
          onClick={handleGuestLogin}
          className={styles.guest}
          type="submit"
        >
          GUEST LOG IN
        </button>
        {/* <NavLink className={styles.signup} to={SignUpFormModal}>
          Don't have an account yet? Sign up
        </NavLink> */}
        <span className={styles.copyright}>
          Copyright © Horizon Health 2022.{" "}
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
