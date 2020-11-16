import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
}));

const Login = () => {
  const classes = useStyles();

  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/auth/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        if (data && data.error) {
          setLoginError(data.message);
        }
        if (data && data.token) {
          cookie.set("token", data.token, { expires: 2 });
          Router.push("/dashboard");
        }
      });
  }
  return (
    <div className="container">
      <div className="login-wrapper">
        <form className="login" onSubmit={handleSubmit}>
          <img src="https://www.trademax24.de/media/image/fb/g0/be/TradeMax24-LogoKDXsGMH3zglvq.png" />
          <TextField
            id="standard-required"
            label="E-Mail"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="standard-password-input"
            label="Passwort"
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            type="submit"
          >
            Anmelden
          </Button>
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        </form>
      </div>
      <style jsx>{`
        .container {
          min-height: calc(100vh - 180px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 80px;
        }
        .login-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100vw;
        }
        .login {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 700px;
        }
        .login img {
          width: 33.33%;
        }
      `}</style>
    </div>
  );
};

export default Login;
