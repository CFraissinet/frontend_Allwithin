import React, { useState } from "react";
import styles from '../styles/SignIn.module.css';
import Link from 'next/link';

function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
            console.log(data)
            if (data.result) {
                location.href = "/lobby";
            } else {
                setError(`${data.error}`)
                setEmail("")
                setPassword("")
            }
        });
    };

    return (
    <div className={styles.main}>
        <div className={styles.navBar}>
        {/* NAV BAR */}
        <Link href='/signUp'>
            <button  className={styles.buttonSignUp}>Sign up</button>
        </Link>
        </div>
        <div className={styles.componant}>
        {/* COMPOSANT LEFT */}
            <div className={styles.signIn}>
                {/* CATCH TEXT */}
                <div className={styles.catchText}> Signing <a className={styles.a}>IN</a></div>
                <div className={styles.lineContainer}>
                    <div className={styles.line}>
                    </div>
                    <div className={styles.square}>
                    </div>
                </div>
                <div>
                    <div className={styles.inputDiv}>
                        {/* DIV CONTAINER SIGN IN AND GO TO SIGN UP */}
                    <span className={styles.error}>{error}</span>
                        <div className={styles.emailInput}>
                            <span className={styles.textInput}>Enter your email :</span>
                            <input  onChange={(e) => setEmail(e.target.value)} value={email} className={styles.inputEmail} type="email" placeholder="Work email address" />
                        </div>
                        <div className={styles.passwordInput}>
                            <span className={styles.textInput}>Enter your password :</span>
                            <input  onChange={(e) => setPassword(e.target.value)} value={password} className={styles.inputPassword} type="password" placeholder="Password" />
                            <span className={styles.textForgot}>Forgot your password ? <a href="https://twitter.com/home?lang=fr" className={styles.b}>CLICK HERE</a></span>
                        </div>
                        <div className={styles.buttonCo}>
                            <button onClick={clickSignIn}  className={styles.buttonSignIn}>SIGN IN 
                            </button> 
                        </div>
                        <div>
                            <span className={styles.textNoAccount}>No account yet ? <a href="https://twitter.com/home?lang=fr" className={styles.bNoAccount}>SIGN UP HERE</a></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.graph}>
                {/* CONTAINER FOR IMG */}
                <div  className={styles.svg}>
                    <img className={styles.img1} src="/images/SignIn1.svg" alt="Image1 " />
                    <img className={styles.img2} src="/images/SignIn2.svg" alt="Image2" />
                </div>
            </div>
        </div>
    </div>
);
}

export default SignIn   ;