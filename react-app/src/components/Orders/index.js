import styles from "./Orders.module.css";
import { useEffect, useState, useMemo } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cartReducer, { myOrders } from "../../store/order";

const Orders = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const orders = useSelector((state) => state.orders);

  return <div>hi</div>;
};

export default Orders;
