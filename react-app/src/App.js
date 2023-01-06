import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
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

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const [cart, setCart] = useState([]);

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
      <Sidebar cart={cart} setCart={setCart} />
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
          <Item cart={cart} setCart={setCart} />
        </Route>
        <Route path="/items/:id" exact={true}>
          <ItemDetails cart={cart} setCart={setCart} />
        </Route>
        <Route path="/cart" exact={true}>
          <Cart cart={cart} setCart={setCart} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
