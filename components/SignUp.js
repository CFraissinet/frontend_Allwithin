import { useRef, useState } from "react";
import styles from "../styles/SignUp.module.css";
import Link from "next/link";
import { Document, Page, pdfjs } from "react-pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

function Signup() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  console.log(user);

  const inputCVRef = useRef(null);
  const inputPhotoRef = useRef(null);

  const [pageNumber, setPageNumber] = useState(1);
  const [previewCV, setPreviewCV] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(false);
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
  const [errorCV, setErrorCV] = useState("");
  const [errorAvatar, setErrorAvatar] = useState("");
  const [loader, setLoader] = useState(false);
  const [confirm, setConfirmError] = useState("");

  const cvClick = (e) => {
    e.preventDefault();
    // Click sur l'input moche masqué
    inputCVRef.current.click();
  };

  const photoClick = (e) => {
    e.preventDefault();
    // Click sur l'input moche masqué
    inputPhotoRef.current.click();
  };

  const HandleTextArea = (value) => {
    setExperiences(value);
    setCounter(value.length);
  };

  const confirmClick = (e) => {
    e.preventDefault();
    setLoader(true);

    const dataInfo = {
      firstname: firstname,
      name: name,
      email: email,
      password: password,
      job: null,
      experiences: null,
    };

    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          if (inputCVRef.current.files[0]) {
            console.log("have cv");
            const formData = new FormData();
            formData.append("cv", inputCVRef.current.files[0]);
            formData.append("data", JSON.stringify(dataInfo));
            fetch("http://localhost:3000/users/updateCV", {
              method: "POST",
              body: formData,
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("cv log", data);
              });
          }

          if (inputPhotoRef.current.files[0]) {
            console.log("have avatar");
            const formData = new FormData();
            formData.append("avatar", inputPhotoRef.current.files[0]);
            formData.append("data", JSON.stringify(dataInfo));
            fetch("http://localhost:3000/users/updateAvatar", {
              method: "POST",
              body: formData,
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("avatar log", data);
              });
          }
          setLoader(false);
          dispatch(login({ token: data.user.token }));
          Cookies.set("token", data.token);
          console.log("go to lobby", data);
          location.href = "./lobby";
        } else {
          setLoader(false);
          setConfirmError("");
          console.log(data.error);
        }
      });
  };

  // Generating a base64 version of a pdf file
  function generateCV(e) {
    //Read File
    let selectedFile = e.target.files;
    //Check File is not Empty
    if (selectedFile.length > 0) {
      // Select the very first file from list
      var fileToLoad = selectedFile[0];
      // FileReader function for read the file.
      var fileReader = new FileReader();
      var base64;
      // Onload of file read the file content
      fileReader.onload = function (fileLoadedEvent) {
        base64 = fileLoadedEvent.target.result;
        // Print data in console
        setCV(base64);
      };
      // Convert data to base64
      fileReader.readAsDataURL(fileToLoad);
    }
  }
  //

  // Styling text color for error messages
  let errorColorCV;
  let errorColorAvatar;
  if (previewCV) {
    errorColorCV = { color: "#152232" };
  } else {
    errorColorCV = { color: "#FF0000" };
  }

  if (previewAvatar) {
    errorColorAvatar = { color: "#152232" };
  } else {
    errorColorAvatar = { color: "#FF0000" };
  }
  //

  // for poping files preview when uploading files (CV & AVATAR)
  const popCV = (
    <div className={styles.pdf}>
      <Document file={CV}>
        <Page height={100} pageNumber={pageNumber} renderTextLayer={false} />
      </Document>
    </div>
  );

  const popImg = (
    <img className={styles.photoPreview} src={avatar} alt="photo" />
  );
  //

  const handleOnChangeCV = (e) => {
    if (e.target.value.includes(".pdf")) {
      generateCV(e);
      setPreviewCV(true);

      setErrorCV(e.target.value.slice(12));
    } else {
      setPreviewCV(false);
      setErrorCV("Only PDF files are accepted");
    }
  };

  const handleOnChangeAvatar = (e) => {
    if (
      e.target.value.includes(".jpeg") ||
      e.target.value.includes(".jpg") ||
      e.target.value.includes(".png")
    ) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
      setPreviewAvatar(true);
      setErrorAvatar(e.target.value.slice(12));
    } else {
      setPreviewAvatar(false);
      setErrorAvatar("Only JPEG, JPG or PNG files are accepted");
    }
  };

  return (
    //Embedded all JSX code with "form" tag to collect all infos from inputs
    <div className={styles.mainContainer}>
      <form className={styles.formSignUp} encType="multipart/form-data">
        {/*BOT CONTAINER*/}
        <div className={styles.botContainer}>
          {/*BOT LEFT CONTAINER*/}

          <div className={styles.botLeftContainer}>
            <h1 className={styles.title}>
              Signing <span className={styles.titleUp}>Up</span>
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
                Already have an account ?{" "}
              </h2>
              <Link href="/signIn">
                <span className={styles.signInHere}>SIGN IN HERE</span>
              </Link>
            </div>
          </div>

          {/*BOT Right CONTAINER*/}
          <div className={styles.botRightContainer}>
            <div className={styles.content}>
              {/* DROP DOWN MENU */}
              <h2 className={styles.dropMenuTxt}>Select a job post :</h2>
              <select
                onChange={(e) => setJob(e.target.value)}
                className={styles.dropMenu}
                name="language"
                id="language"
              >
                <option value="" defaultValue>
                  Drop & Select
                </option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="c++">C++</option>
              </select>
              {/* TEXT AREA */}

              <div className={styles.areaTxtContent}>
                <h2 className={styles.areaTxt}>
                  Do you have any experiences ?
                </h2>
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
                <div className={styles.cvButtonContent}>
                  <button
                    onClick={(e) => cvClick(e)}
                    className={styles.cvButton}
                  >
                    Join your CV
                  </button>

                  <span className={styles.errorTxt} style={errorColorCV}>
                    {errorCV}
                  </span>

                  <input
                    className={styles.inputCV}
                    ref={inputCVRef}
                    id="cv"
                    name="cv"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleOnChangeCV(e)}
                  />
                </div>
                {previewCV && popCV}

                {/* PROFILE PICTURE */}
                <div className={styles.photoButtonContent}>
                  <button
                    onClick={(e) => photoClick(e)}
                    className={styles.photoButton}
                  >
                    Profile picture
                  </button>
                  <span className={styles.errorTxt} style={errorColorAvatar}>
                    {errorAvatar}
                  </span>
                </div>
                <input
                  className={styles.inputCV}
                  ref={inputPhotoRef}
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/png, image/jpeg,image/jpg"
                  onChange={(e) => handleOnChangeAvatar(e)}
                />
                {previewAvatar && popImg}
              </div>
            </div>

            <div className={styles.confirmButtonContent}>
              {loader && (
                <FontAwesomeIcon size="2x" icon={faSpinner} spinPulse />
              )}
              <button
                onClick={(e) => confirmClick(e)}
                className={styles.confirmButton}
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
