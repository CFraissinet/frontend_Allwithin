import React, { useState } from "react";
import styles from "../styles/SignIn.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import Cookies from "js-cookie";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  /* Fetch for connect to account and go to /Lobby */
  const clickSignIn = () => {
    const data = {
      email: email,
      password: password,
    };

    /* Const for validate if that was a */
    const verifEmail = new RegExp(
      "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
    );

    const validate = verifEmail.test(email);
    if (!validate) {
      setError("Please enter a valid email");
      setEmail("");
      setPassword("");
      return;
    }

    fetch("https://backend-allwithin.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          fetch(
            `https://backend-allwithin.vercel.app/users/userData/${data.token}`
          )
            .then((response) => response.json())
            .then((dataUser) => {
              dispatch(
                login({
                  token: dataUser.userData.token,
                  avatar: dataUser.userData.photo,
                })
              );

              Cookies.set("token", data.token);
              location.href = "/lobby";
            });
        } else {
          setError(`${data.error}`);
          setEmail("");
          setPassword("");
        }
      });
  };

  return (
    <div className={styles.main}>
      <div className={styles.component}>
        {/* COMPOSANT LEFT */}
        <div className={styles.signIn}>
          {/* CATCH TEXT */}
          <div>
            <div className={styles.catchText}>
              {" "}
              Signing<b className={styles.a}>In</b>
            </div>
            <div className={styles.lineContainer}>
              <div className={styles.line}></div>
              <div className={styles.square}></div>
            </div>
          </div>
          <div className={styles.inputDiv}>
            {/* DIV CONTAINER SIGN IN AND GO TO SIGN UP */}
            <span className={styles.error}>{error}</span>
            <div className={styles.emailInput}>
              <span className={styles.textInput}>Enter your email :</span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={styles.inputEmail}
                type="email"
                placeholder="Work email address"
                onClick={() => setError("")}
              />
            </div>
            <div className={styles.passwordInput}>
              <span className={styles.textInput}>Enter your password :</span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={styles.inputPassword}
                type="password"
                placeholder="Password"
                onClick={() => setError("")}
              />
              {/* <h2 className={styles.textNoAccount}>
                Forgot your password ?{" "}
                <Link href="/">
                  <span className={styles.bNoAccount}>CLICK HERE</span>
                </Link>
              </h2> */}
            </div>
            <div className={styles.buttonCo}>
              <button onClick={clickSignIn} className={styles.buttonSignIn}>
                SIGN IN
              </button>
            </div>

            <h2 className={styles.noAccount}>
              No account yet ?{" "}
              <Link href="/signUp">
                <span className={styles.bNoAccount}>SIGN UP HERE</span>
              </Link>
            </h2>
          </div>
        </div>
        <div className={styles.graph}>
          <div className={styles.svg}>
            <img
              className={styles.img1}
              src="/images/SignIn1.svg"
              alt="Image1 "
            />
            <img
              className={styles.img2}
              src="/images/SignIn2.svg"
              alt="Image2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
