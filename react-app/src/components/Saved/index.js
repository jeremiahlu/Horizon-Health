import React from "react";
import { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchSaved, removeSave } from "../../store/saved";
import styles from "./Saved.module.css";
import { fetchCart } from "../../store/cart";

function Saved({ results, favorites }) {
  const dispatch = useDispatch();
  const saves = useSelector((state) => Object.values(state.saved));
  const items = useSelector((state) => Object.values(state.items));
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    const getSaved = async () => {
      if (user) {
        await dispatch(fetchSaved(user?.id));
      }
    };
    getSaved();
    dispatch(fetchCart(user?.id));
  }, [dispatch, user]);

  return (
    <>
      <div className={styles.savedDiv}>
        <div className={styles.header}>Saved locations</div>
        <div className={styles.savedItem}>
          {saves?.map((save, idx) => (
            <div className={styles.remove} key={idx}>
              {/* <div className={styles.info}> */}
              {/* {console.log(
                save?.marker.result.photos[0].html_attributions[0],
                "sdahosas"
              )} */}
              <div className={styles.leftDiv}>
                <div>
                  {save.marker.photos ? (
                    <div className={styles.photoDiv}>
                      <img
                        className={styles.photo}
                        src={saves.marker.photos[0].getUrl({
                          maxWidth: 100,
                          maxHeight: 100,
                        })}
                        alt="Place photo"
                      />
                    </div>
                  ) : (
                    <div className={styles.photoDiv}>
                      <img
                        className={styles.photo}
                        src="https://www.pngitem.com/pimgs/m/504-5040528_empty-profile-picture-png-transparent-png.png"
                      />
                    </div>
                  )}
                </div>
                <div className={styles.info}>
                  <div className={styles.title}>{save.marker.title}</div>
                  <div>{save.marker.address}</div>
                  <div className={styles.status}>
                    {/* {save.marker.open ? "Open" : "Closed"} */}
                    {save.marker.open ? (
                      <div className={styles.open}> Open </div>
                    ) : (
                      <div className={styles.closed}> Closed </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={styles.delete}
                onClick={async (e) => {
                  e.preventDefault();
                  await dispatch(removeSave(user.id, save.id));
                }}
              >
                <i className={`${styles.deleteSave} fa-solid fa-xmark`}></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Saved;
