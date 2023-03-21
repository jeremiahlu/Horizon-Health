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

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.imageContainer}>
        <img
          src="https://i.pinimg.com/564x/8d/29/ef/8d29ef579d2a0b86886f53673a5324da.jpg"
          default=""
          className={styles.sidebarLogo}
        />
        <img src="./nyc.png" default="" className={styles.cityscape} />
      </div>

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
        <div className={styles.imgContainer}>
          <img
            src="./central-park.png"
            default=""
            className={styles.centralPark}
          />
        </div>
      </div>

      <div className={styles.cardsContainer}>
        <div className={styles.cards} id={styles["card0"]}>
          <img
            className={styles.slideImage}
            src="https://www.alkaff.com.sg/wp-content/uploads/2022/05/image2.jpg"
          />
          <div className={styles.slideTextContainer}>
            <span className={styles.slideText}>
              Shop for what you need. Bringing self-care to your doorstep
              without leaving the house.
            </span>
            <NavLink className={styles.navLink} to="/items">
              Shop Now
            </NavLink>
          </div>
        </div>

        <div className={styles.cards} id={styles["card1"]}>
          <img
            className={styles.slideImage}
            src="https://cdn.aarp.net/content/dam/aarp/health/conditions_treatments/2019/11/1140-man-consults-doctor.imgcache.rev.web.1740.1000.jpg"
          />
          <div className={styles.slideTextContainer}>
            <span className={styles.slideText}>
              Find health care providers near you. Locating a doctor shouldn't
              be hard.
            </span>
            <NavLink className={styles.navLink} to="/maps">
              Get Started
            </NavLink>
          </div>
        </div>
        <div className={styles.cards} id={styles["card2"]}>
          <img
            className={styles.slideImage}
            src="https://www.national.edu/wp-content/uploads/2021/11/Nov_4_iStock-1127069581-scaled.jpeg"
          />

          <div className={styles.slideTextContainer}>
            <span className={styles.slideText}>
              The first step is always the hardest. We make it easy. Health care
              at your fingertips.
            </span>
            <NavLink className={styles.navLink} to="/">
              Learn More
            </NavLink>
          </div>
        </div>
      </div>

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
        </div>

        <div className={styles.account}>
          <span className={styles.accountTitle}>Account</span>
          {session ? (
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
