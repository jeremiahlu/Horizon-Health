import React from "react";
import { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchSaved } from "../../store/saved";
import styles from "./Saved.module.css";

function Saved({ results, favorites }) {
  const dispatch = useDispatch();
  const saves = useSelector((state) => Object.values(state.saved));
  useEffect(async () => {
    await dispatch(fetchSaved());
  }, []);
  return (
    <div className={styles.savedDiv}>
      <div className={styles.savedItem}>
        {/* {console.log(favorites, "favorites")} */}
        {favorites?.map((favorite, idx) => (
          <div key={idx}>
            <div>{favorite.title}</div>
            <div>{favorite.address}</div>
            <div>{favorite.open ? "Open" : "Closed"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Saved;
