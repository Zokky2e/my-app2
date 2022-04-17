import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Card from "../ui/Card";
import classes from "./SignIn.module.css";
function SignIn() {
  const [isLogin, setIsLogin] = useState(<Login />);
  function onClickRegister() {
    setIsLogin(<Register />);
  }
  function onClickLogin() {
    setIsLogin(<Login />);
  }

  return (
    <Card>
      <div className ={classes.block}>
        <span className={classes.login}>
          <button onClick={onClickLogin}>Login</button>
        </span>
        <span className={classes.register}>
          <button onClick={onClickRegister}>Register</button>
        </span>
      </div>
      <div>{isLogin}</div>
    </Card>
  );
}

export default SignIn;
