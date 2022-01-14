import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import { selectUser } from "./features/userSlice";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const user = useSelector(selectUser);
  return (
    <div className="App">
      <Router>{user ? <Logout /> : <Login />}</Router>
    </div>
  );
}

export default App;
