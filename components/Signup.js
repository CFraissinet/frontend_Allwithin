import { useRef, useEffect, useState } from "react";
import styles from "../styles/Signup.module.css";

function Signup() {
  const inputCVRef = useRef(null);
  const inputPhotoRef = useRef(null);

  const [CV, setCV] = useState("");
  const [avatar, setAvatar] = useState("");
  const [firstname, setFirstname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [job, setJob] = useState("");
  const [experiences, setExperiences] = useState("");
  const [counter, setCounter] = useState("0");

  const cvClick = (e) => {
    e.preventDefault();

    // Click sur l'input moche masqué
    inputCVRef.current.click();
    console.log("join CV");
  };

  const photoClick = (e) => {
    e.preventDefault();
    // Click sur l'input moche masqué
    inputPhotoRef.current.click();
    console.log("join photo");
  };

  const signInClick = () => {
    console.log("SignIn");
  };

  const signInHereClick = () => {
    console.log("SignInHere");
  };

  const HandleTextArea = (value) => {
    setExperiences(value);
    setCounter(value.length);
  };

  const confirmClick = (e) => {
    e.preventDefault();

    const data = {
      firstname: firstname,
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      job: job,
      experiences: experiences,
    };

    console.log(data);
    const formData = new FormData();
    formData.append("cv", inputCVRef.current.files[0]);
    formData.append("avatar", inputPhotoRef.current.files[0]);

    formData.append("data", JSON.stringify(data));

    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <form encType="multipart/form-data" className={styles.mainContainer}>
      {/* HEADER */}
      <div className={styles.headerContainer}>
        {/* LOGO */}
        <div className={styles.button}>
          <span>LOGO</span>
        </div>
        {/* BUTTON */}
        <button onClick={() => signInClick()} className={styles.signInbutton}>
          Sign in
        </button>
      </div>

      {/*BOT CONTAINER*/}
      <div className={styles.botContainer}>
        {/*BOT LEFT CONTAINER*/}

        <div className={styles.botLeftContainer}>
          <h1 className={styles.title}>
            SIGNING <span className={styles.titleUp}>UP</span>
          </h1>

          <div className={styles.lineContent}>
            <div className={styles.line}></div>
            <div className={styles.square}></div>
          </div>
          {/* INPUT CONTAINER */}
          <div className={styles.inputContainer}>
            <div className={styles.inputBox}>
              <h2 className={styles.labelTxt}>Enter your firstname :</h2>
              <input
                name="firstname"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                className={styles.input}
                placeholder="John"
              ></input>
            </div>

            <div className={styles.inputBox}>
              <h2 className={styles.labelTxt}>Enter your name :</h2>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={styles.input}
                placeholder="Doe"
              ></input>
            </div>

            <div className={styles.inputBox}>
              <h2 className={styles.labelTxt}>Enter your e-mail :</h2>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={styles.input}
                placeholder="email@gmail.com"
              ></input>
            </div>

            <div className={styles.inputBox}>
              <h2 className={styles.labelTxt}>Enter your password</h2>

              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                className={styles.input}
                placeholder="**********"
              ></input>
            </div>

            <div className={styles.inputBox}>
              <h2 className={styles.labelTxt}>Confirm you password</h2>

              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                value={confirmPassword}
                className={styles.input}
                placeholder="**********"
              ></input>
            </div>
            <h2 className={styles.accountReady}>
              Already have an account?{" "}
              <span
                onClick={() => signInHereClick()}
                className={styles.signInHere}
              >
                SIGN IN HERE
              </span>
            </h2>
          </div>
        </div>

        {/*BOT Right CONTAINER*/}
        <div className={styles.botRightContainer}>
          <div className={styles.content}>
            {/* DROP DOWN MENU */}
            <h2 className={styles.dropMenuTxt}>Select a job post :</h2>
            <select className={styles.dropMenu} name="language" id="language">
              <option value="" defaultValue>
                Drop & Select
              </option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="c++">C++</option>
            </select>
            {/* TEXT AREA */}

            <div className={styles.areaTxtContent}>
              <h2 className={styles.areaTxt}>Do you have any experiences ?</h2>
              <h2 className={styles.areaTxt}>{counter}/1000</h2>
            </div>
            <textarea
              onChange={(e) => HandleTextArea(e.target.value)}
              maxLength="1000"
              value={experiences}
              className={styles.textArea}
              placeholder="Describe your experiences in a few words..."
            ></textarea>

            {/* JOIN CV AND PHOTO */}
            <div className={styles.joinFileContent}>
              {/* CV */}
              <button onClick={(e) => cvClick(e)} className={styles.cvButton}>
                Join your CV *
              </button>

              <input
                className={styles.inputCV}
                ref={inputCVRef}
                id="cv"
                name="cv"
                type="file"
                onChange={(e) => setCV(e.target.value)}
              />

              {/* PROFILE PICTURE */}
              <button
                onClick={(e) => photoClick(e)}
                className={styles.photoButton}
              >
                Profile picture
              </button>

              <input
                className={styles.inputCV}
                ref={inputPhotoRef}
                id="avatar"
                name="avatar"
                type="file"
                onChange={(e) => setAvatar(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={(e) => confirmClick(e)}
            className={styles.confirmButton}
          >
            CONFIRM
          </button>
        </div>
      </div>
    </form>
  );
}

export default Signup;
