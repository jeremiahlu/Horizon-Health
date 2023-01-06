import { useParams, Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import Profile from "../Dashboard/ProfileButton";
import styles from "./Account.module.css";
// import { removeFriendThunk } from "../../store/friend";
// import ImageModal from "../ImageModal";

const AccountSettings = () => {
  const loggedSession = useSelector((state) => state.session.user);
  console.log(loggedSession, "USER");

  return (
    <div className={styles.container}>
      <div className="dash-navbar">
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

      <div className="account-settings-title">Your account</div>
      <div className="account-settings-main">
        <div className="as-image-div">
          <img
            className={styles.profilePicture}
            src={loggedSession.profile_picture}
          ></img>

          <div className="as-add-image">
            <span className="as-add-image-text">
              Change your profile picture
            </span>
            <button className="as-choose-file">
              <input className="as-file-input" type="file" multiple />
            </button>
          </div>
        </div>

        <div className="as-user-info-div">
          <div className="as-user-info-list">
            <li className="as-user-info-label">Your username</li>
            <div className="as-user-info">{loggedSession.username}</div>

            <li className="as-user-info-label">Your name</li>
            <div className="as-user-info">
              {loggedSession.first_name + " " + loggedSession.last_name}
            </div>

            <li className="as-user-info-label">Your email address</li>
            <div className="as-user-info">{loggedSession.email}</div>

            <li className="as-user-info-label">Gender</li>
            <div className="as-user-info">{loggedSession.gender}</div>

            <li className="as-user-info-label">Your address</li>
            <div className="as-user-info">{loggedSession.address}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
