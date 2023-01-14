import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LogInFormModal";
import SignUpForm from "./components/auth/SignUpFormModal";
// import NavBar from './components/NavBar';
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Item from "./components/Item";
import Account from "./components/Account";
import { authenticate } from "./store/session";
import "./index.css";
import ItemDetails from "./components/Item/ItemDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Complete from "./components/Checkout/CheckoutComplete";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  // const [cart, setCart] = useState([]);
  const cart = useSelector((state) => Object.values(state.cart));

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Sidebar cart={cart} />
      <Switch>
        {/* <Route path="/login" exact={true}>
          <LoginForm />
        </Route> */}
        {/* <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route> */}
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/account" exact={true}>
          <Account />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          {/* <h1>My Home Page</h1> */}
          <Dashboard />
        </Route>
        <Route path="/items" exact={true}>
          <Item cart={cart} />
        </Route>
        <Route path="/checkout" exact={true}>
          <Checkout cart={cart} />
        </Route>
        <Route path="/checkout/complete" exact={true}>
          <Complete cart={cart} />
        </Route>
        <Route path="/items/:id" exact={true}>
          <ItemDetails cart={cart} />
        </Route>
        <Route path="/cart/:id/items" exact={true}>
          <Cart cart={cart} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
