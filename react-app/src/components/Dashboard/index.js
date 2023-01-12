// import Sidebar from '../../components/Sidebar';
import styles from "./Dashboard.module.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemsThunk } from "../../store/item";
import * as sessionActions from "../../store/session";

const Dashboard = () => {
  const dispatch = useDispatch();
  const allItems = useSelector((state) => state.items);

  // const filtered = useMemo(() => {
  //   return allItems?.filter((item) => {
  //     return item.toLowerCase().includes(search.toLowerCase());
  //   });
  // }, [allItems, search]);

  // useEffect(() => {
  //   console.log(allItems, "HERE");
  //   const getItems = async () => {
  //     await dispatch(getItemsThunk());
  //   };
  //   getItems();
  // }, [dispatch]);
  return (
    <div className={styles.dashboardContainer}>
      <img src="./HH-logo.png" default="" className={styles.sidebarLogo} />
      <img src="./nyc.png" default="" className={styles.cityscape} />

      <div className={styles.aboutUsContainer}>
        <div className={styles.aboutUs}>
          <h1 className={styles.headerText}>About Us</h1>
          <span className={styles.text}>
            We are passionate about helping consumers to improve their health
            and maximize their time looking for healthcare providers. We also
            advocate for the eligibility of important new product categories,
            such as OTC meds and general care products.
          </span>
        </div>
        <img
          src="./central-park.png"
          default=""
          className={styles.centralPark}
        />
      </div>

      <div className={styles.parallax}>
        <div className={styles.slider}>
          <ul className={styles.nav}></ul>
          <div data-target="left" className={styles.left}></div>
          <div data-target="right" className={styles.right}></div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.brandDiv}>
          <img
            src="../images/HH-logo.png"
            default=""
            className={styles.footerLogo}
          />
          <span className={styles.brandName}>Horizon Health</span>
        </div>

        <div className={styles.company}>
          Our Company
          <NavLink to="/about-us" className={styles.footerAboutUs}>
            <span>About Us</span>
          </NavLink>
        </div>

        <div className={styles.account}>
          Account
          <NavLink to="/log-in" className={styles.logIn}>
            <span>Log in</span>
          </NavLink>
          <NavLink to="/sign-up" className={styles.signUp}>
            <span>Sign up</span>
          </NavLink>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
