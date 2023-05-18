import React, { useState } from "react";
import styles from "../styles/SignIn.module.css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  const clickSignIn = () => {
    const data = {
      email: email,
      password: password,
    };

    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          location.href = "/lobby";
          dispatch(login({ token: data.token }));
        } else {
          setError(`${data.error}`);
          setEmail("");
          setPassword("");
        }
      });
  };

  return (
    <div className={styles.main}>
      <div className={styles.navBar}>
        {/* LOGO */}
        <div className={styles.button}>
          <Link href="/">
            <img src="logo.png" alt="Logo" className={styles.logo} />
          </Link>
        </div>
        <Link href="/signUp">
          <button className={styles.buttonSignUp}>Sign up</button>
        </Link>
      </div>
      <div className={styles.component}>
        {/* COMPOSANT LEFT */}
        <div className={styles.signIn}>
          {/* CATCH TEXT */}
          <div className={styles.catchText}>
            {" "}
            Signing<b className={styles.a}>In</b>
          </div>
          <div className={styles.lineContainer}>
            <div className={styles.line}></div>
            <div className={styles.square}></div>
          </div>
          <div>
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
                />
                <h2 className={styles.textNoAccount}>
                  Forgot your password ?{" "}
                  <Link href="/">
                    <span className={styles.bNoAccount}>CLICK HERE</span>
                  </Link>
                </h2>
              </div>
              <div className={styles.buttonCo}>
                <Link href="/lobby">
                  <button className={styles.buttonSignIn}>SIGN IN</button>
                </Link>
              </div>

              <h2 className={styles.noAccount}>
                No account yet ?{" "}
                <Link href="/signUp">
                  <span className={styles.bNoAccount}>SIGN UP HERE</span>
                </Link>
              </h2>
            </div>
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
