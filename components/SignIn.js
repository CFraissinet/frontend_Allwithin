import React from "react";
import styles from '../styles/SignIn.module.css';
import Link from 'next/link';

function SignIn() {

    const clickSignIn = () => {
        console.log('Go to SignIn')
    };

    const clickSignUp = () => {
        console.log('Go to SignUp')
    };

    return (
    <div className={styles.main}>
        <div className={styles.navBar}>
        <Link href='/signUp'>
            <button  className={styles.buttonSignUp}>Sign up</button>
        </Link>
        </div>
        <div className={styles.componant}>
            <div className={styles.signIn}>
                <div className={styles.catchText}> Signing <a className={styles.a}>IN</a></div>
                <div className={styles.lineContainer}>
                    <div className={styles.line}>
                    </div>
                    <div className={styles.square}>
                    </div>
                </div>
                <div>
                    <div className={styles.inputDiv}>
                        <div className={styles.emailInput}>
                            <span className={styles.textInput}>Enter your email :</span>
                            <input className={styles.inputEmail} type="email" placeholder="Work email address" />
                        </div>
                        <div className={styles.passwordInput}>
                            <span className={styles.textInput}>Enter your password :</span>
                            <input className={styles.inputPassword} type="text" placeholder="Password" />
                            <span className={styles.textForgot}>Forgot your password ? <a href="https://twitter.com/home?lang=fr" className={styles.b}>CLICK HERE</a></span>
                        </div>
                        <div className={styles.buttonCo}>
                       
                            <button  className={styles.buttonSignIn}>SIGN IN 
                            </button> 
                                       
                        </div>
                        <div>
                            <span className={styles.textNoAccount}>No account yet ? <a href="https://twitter.com/home?lang=fr" className={styles.bNoAccount}>SIGN UP HERE</a></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.graph}>
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