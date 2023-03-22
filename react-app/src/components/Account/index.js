import { useParams, Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import Profile from "../Dashboard/ProfileButton";
import styles from "./Account.module.css";
import { myOrders } from "../../store/order";
// import { removeFriendThunk } from "../../store/friend";
// import ImageModal from "../ImageModal";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const loggedSession = useSelector((state) => state.session.user);
  const orders = useSelector((state) => Object.values(state.orders));
  // const cartItemList = useSelector((state) =>
  //   Object.values(state.order.cart_items)
  // );
  console.log(orders[0], "ORDERS");
  // console.log(loggedSession, "USER");

  const [selectedTab, setSelectedTab] = useState("accountDetails");

  useEffect(() => {
    const myOrderList = async () => {
      await dispatch(myOrders(loggedSession.id));
    };
    myOrderList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.dashNavbar}>
        <div className={styles.navHeader}>
          <img
            className={styles.profilePicture}
            src={loggedSession.profile_picture}
          ></img>
          <div className={styles.navUserName}>
            {loggedSession.first_name + " " + loggedSession.last_name}
          </div>
        </div>
        <div
          className={`${styles.editProfile} ${
            selectedTab === "accountDetails" && styles.selectedTab
          }`}
          onClick={() => setSelectedTab("accountDetails")}
        >
          {" "}
          Account Details{" "}
        </div>
        <div
          className={`${styles.editProfile} ${
            selectedTab === "orders" && styles.selectedTab
          }`}
          onClick={() => setSelectedTab("orders")}
        >
          Orders{" "}
        </div>
      </div>

      {selectedTab === "accountDetails" ? (
        <div className={styles.accountSettingsMain}>
          <div className={styles.accountDetails}>Account Details</div>

          <div className={styles.userInfoList}>
            <div className={styles.userInfo}>
              <li className={styles.label}> Username</li>
              <input
                defaultValue={loggedSession.username}
                className={styles.info}
                type="text"
                readOnly="readonly"
              />
            </div>

            <div className={styles.userInfo}>
              <li className={styles.label}> Name</li>

              <input
                defaultValue={
                  loggedSession.first_name + " " + loggedSession.last_name
                }
                className={styles.info}
                type="text"
                readOnly="readonly"
              />
            </div>

            <div className={styles.userInfo}>
              <li className={styles.label}> Email</li>
              <input
                defaultValue={loggedSession.email}
                className={styles.info}
                type="text"
                readOnly="readonly"
              />
            </div>

            <div className={styles.userInfo}>
              <li className={styles.label}>Gender</li>
              <input
                defaultValue={loggedSession.gender}
                className={styles.info}
                type="text"
                readOnly="readonly"
              />
            </div>

            <div className={styles.userInfo}>
              <li className={styles.label}>Address</li>
              <input
                defaultValue={loggedSession.address}
                className={styles.info}
                type="text"
                readOnly="readonly"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.accountOrdersMain}>
          <div className={styles.yourOrders}>Your Orders</div>
          <div className={styles.ordersList}>
            {orders[0].map((order, idx) => {
              return (
                <div className={styles.order} key={idx}>
                  <div className={styles.orderDetails}>
                    <div className={styles.orderTop}>
                      <div className={styles.orderNumber}>
                        Order Number: {order.id}
                      </div>
                      <div className={styles.price}>
                        Total Price: ${order?.total_price}
                      </div>
                    </div>
                    <div>
                      <div className={styles.purchased}>
                        <div>
                          {" "}
                          Delivered to{" "}
                          {`${order?.user.first_name} 
                      ${order?.user.last_name}
                      at
                      ${order?.user.address}`}
                        </div>
                        Purchased on: {order?.created_at}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
