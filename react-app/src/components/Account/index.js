import { useParams, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import Profile from "../Dashboard/ProfileButton";
import styles from "./Account.module.css";
// import { removeFriendThunk } from "../../store/friend";
// import ImageModal from "../ImageModal";

const AccountSettings = () => {
  const loggedSession = useSelector((state) => state.session.user);
  // console.log(loggedSession, "USER");

  return (
    <div className={styles.container}>
      <div className={styles.dashNavbar}>
        <div className={styles.editProfile}> Edit Profile </div>
        {/* <div className="dash-logo-div">
          <Link className="dash-link" to="/dashboard">
            <img
              className="dash-logo"
              src="https://assets.splitwise.com/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg"
            />
          </Link>
        </div> */}

        {/* <div className="profileButton-div">
          <Link className="as-dash-link" to="/dashboard">
            Home
          </Link>
          <img
            className="profile-picture"
            src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal32-50px.png"
            alt="profile-picture"
          /> */}
        {/* <Profile user={loggedSession} /> */}
        {/* {          console.log(loggedSession, 'here') */}
        {/* <i className="fa-solid fa-caret-down"></i> */}
        {/* </div> */}
      </div>

      <div className={styles.accountSettingsMain}>
        <div className={styles.imageDiv}>
          <img
            className={styles.profilePicture}
            src={loggedSession.profile_picture}
          ></img>

          <div className={styles.addImage}>
            {loggedSession.username}
            <span className={styles.imageText}>
              Change your profile picture
              <button className={styles.chooseFile}>
                <input className="as-file-input" type="file" multiple />
              </button>
            </span>
          </div>
        </div>

        <div className={styles.userInfoList}>
          <div className={styles.userInfo}>
            <li className={styles.label}> Username</li>
            <input value={loggedSession.username} className={styles.info} />
          </div>

          <div className={styles.userInfo}>
            <li className={styles.label}> Name</li>

            <input
              value={loggedSession.first_name + " " + loggedSession.last_name}
              className={styles.info}
            />
          </div>

          <div className={styles.userInfo}>
            <li className={styles.label}> Email</li>
            <input value={loggedSession.email} className={styles.info} />
          </div>

          <div className={styles.userInfo}>
            <li className={styles.label}>Gender</li>
            <input value={loggedSession.gender} className={styles.info} />
          </div>

          <div className={styles.userInfo}>
            <li className={styles.label}>Address</li>
            <input value={loggedSession.address} className={styles.info} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
