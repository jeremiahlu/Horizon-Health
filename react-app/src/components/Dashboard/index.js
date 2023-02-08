// import Sidebar from '../../components/Sidebar';
import styles from "./Dashboard.module.css";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemsThunk } from "../../store/item";
import * as sessionActions from "../../store/session";
import SignUpFormModal from "../auth/SignUpIndex";
import LoginFormModal from "../auth/LogInIndex";
import SignUpForm from "../auth/SignUpFormModal";
import LoginForm from "../auth/LogInFormModal";
import { Modal } from "../../context/Modal";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const dispatch = useDispatch();
  const allItems = useSelector((state) => state.items);
  const session = useSelector((state) => state.session.user);
  // console.log(session, "SESSION");
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
      <img
        src="https://i.pinimg.com/564x/8d/29/ef/8d29ef579d2a0b86886f53673a5324da.jpg"
        default=""
        className={styles.sidebarLogo}
      />
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

      {/* <div className={styles.parallax}>
        <div className={styles.slider}>
          <ul className={styles.nav}></ul>
          <div data-target="left" className={`${styles.left} side-nav`}></div>
          <div data-target="right" className={`${styles.right} side-nav`}></div>
        </div>
      </div> */}

      <footer className={styles.footer}>
        <div className={styles.brandDiv}>
          <img
            src="https://i.pinimg.com/564x/8d/29/ef/8d29ef579d2a0b86886f53673a5324da.jpg"
            default=""
            className={styles.footerLogo}
          />
          <span className={styles.brandName}>Horizon Health</span>
        </div>

        <div className={styles.company}>
          {/* Our Company */}
          {/* <span className={styles.aboutUs}>About Us</span> */}
          About Us
          <div className={styles.links}>
            <a
              target="_blank"
              className={styles.links}
              href="https://github.com/jeremiahlu"
            >
              Github
            </a>
            <a
              target="_blank"
              className={styles.links}
              href="https://www.linkedin.com/in/jeremiah-lu/"
            >
              LinkedIn
            </a>
          </div>
          {/* <NavLink to="/about-us" className={styles.footerAboutUs}>
          </NavLink> */}
        </div>

        <div className={styles.account}>
          <span className={styles.accountTitle}>Account</span>
          {session ? (
            // <button className={styles.accountButton}>
            <NavLink
              to="/account"
              exact={true}
              className={styles.accountButton}
            >
              Account details
            </NavLink>
          ) : (
            <>
              <div className={styles.logInDiv}>
                <button
                  className={styles.logInButton}
                  onClick={() => setShowModal(true)}
                >
                  <div
                    className={styles.iconText}
                    style={{ animationDelay: "0.1s" }}
                  >
                    {" "}
                    Log in{" "}
                  </div>
                </button>

                {showModal && (
                  <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                  </Modal>
                )}
              </div>

              <div className={styles.signUpDiv}>
                <button
                  className={styles.signUpButton}
                  onClick={() => setShowModals(true)}
                >
                  <div
                    className={styles.iconText}
                    style={{ animationDelay: "0.2s" }}
                  >
                    Sign up
                  </div>
                </button>

                {showModals && (
                  <Modal onClose={() => setShowModals(false)}>
                    <SignUpForm />
                  </Modal>
                )}
              </div>
            </>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
