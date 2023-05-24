import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/Profile.module.css";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Link from "next/link";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Profile() {
  const inputCVRef = useRef(null);
  const inputPhotoRef = useRef(null);

  const [modalIsOpen, setIsOpen] = useState(false);

  const [goalsTxt, setGoalsTxt] = useState("");
  const [diplomasTxt, setDiplomasTxt] = useState("");
  const [skillsTxt, setSkillsTxt] = useState("");
  const [projectsTxt, setProjectsTxt] = useState("");
  const [experiencesTxt, setExperiencesTxt] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const [previewCV, setPreviewCV] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(false);
  const [CV, setCV] = useState("");
  const [errorCV, setErrorCV] = useState("");
  const [job, setJob] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [socialNetworks, setSocialNetworks] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errorAvatar, setErrorAvatar] = useState("");

  function openModal() {
    setIsOpen(true);
    console.log(modalIsOpen);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const cvClick = (e) => {
    e.preventDefault();
    // Click sur l'input moche masqué
    inputCVRef.current.click();
  };

  const photoClick = (e) => {
    e.preventDefault();
    // Click sur l'input moche masqué
    if (inputPhotoRef.current) {
      inputPhotoRef.current.click();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (data.result) {
          if (inputCVRef.current.files[0]) {
            console.log("have cv");
            const formData = new FormData();
            formData.append("cv", inputCVRef.current.files[0]);
            const cvResponse = await fetch(
              "http://localhost:3000/users/updateCV",
              {
                method: "POST",
                body: formData,
              }
            );
            const cvData = await cvResponse.json();
            console.log("cv log", cvData);
          }

          if (inputPhotoRef.current.files[0]) {
            console.log("have avatar");
            const formData = new FormData();
            formData.append("avatar", inputPhotoRef.current.files[0]);
            const avatarResponse = await fetch(
              "http://localhost:3000/users/updateAvatar",
              {
                method: "POST",
                body: formData,
              }
            );
            const avatarData = await avatarResponse.json();
            console.log("avatar log", avatarData);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

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
  // let errorColorAvatar;
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

  console.log(experiencesTxt);
  return (
    <div className={styles.mainContainer}>
      {/* HEADER */}

      {/* GENERAL PAGE STRUCTURE */}
      <form className={styles.profile} encType="multipart/form-data">
        <div className={styles.container}>
          {/* LEFT PAGE STRUCTURE */}
          <div className={styles.leftContainer}>
            <h2 className={styles.titleBody}>
              My <span className={styles.span}>Profile</span>
            </h2>
            {/* PROFILE EDIT BUTTON */}
            <span className={styles.profileEditButton} onClick={openModal}>
              Profile edit
            </span>

            <div className={styles.presentation}>
              {/* PICTURE */}
              <div className={styles.imageContainer}>
                <img
                  onClick={(e) => photoClick(e)}
                  className={styles.image}
                  src="profilePicture.jpg"
                  alt="Picture"
                />
                <span className={styles.errorTxt} style={errorColorAvatar}>
                  {errorAvatar}
                </span>
                <input
                  className={styles.inputPicture}
                  ref={inputPhotoRef}
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept="image/png, image/jpeg,image/jpg"
                  onChange={(e) => handleOnChangeAvatar(e)}
                />

                {/* CV */}
                <button onClick={(e) => cvClick(e)} className={styles.cvButton}>
                  CV
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

              {/* PROFILE CARD */}
              <div className={styles.card}>
                <div className={styles.textContainer}>
                  <span className={styles.firstName}>Maxime </span>
                  <span className={styles.name}>GOMEZ-DURET</span>
                  <span className={styles.birthday}>05/06/1992</span>
                  <p className={styles.job}>Lead Developer</p>
                  <p className={styles.location}>
                    <FontAwesomeIcon
                      className={styles.icon}
                      icon={faLocationDot}
                    />
                    Le Tignet, Provence-Alpes-Côte d'Azur, France
                  </p>
                  <p>
                    <a href="tel:0605040302" className={styles.phoneContact}>
                      <FontAwesomeIcon className={styles.icon} icon={faPhone} />
                      06.05.04.03.02
                    </a>
                  </p>
                  <a
                    href="mailto:maxime.gomez-duret@gmail.com"
                    className={styles.mailContact}
                  >
                    <FontAwesomeIcon
                      className={styles.icon}
                      icon={faEnvelope}
                    />
                    maxime.gomez-duret@gmail.com
                  </a>
                  <p className={styles.socialsNetwork}>
                    <a href="https://github.com/my-profile">
                      <FontAwesomeIcon icon={faGithub} /> GitHub
                    </a>
                    <a href="https://linkedin.com/in/my-profile-linkedin">
                      <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* GOALS */}
            <div className={styles.txtContent}>
              <h2 className={styles.titleTxtContent}>
                Goals{" "}
                <small className={styles.counter}>{goalsTxt.length}/1000</small>
              </h2>
            </div>

            {/* GOALS CONTENT */}
            <div className={styles.areaTxtContent}>
              <textarea
                onChange={(e) => setGoalsTxt(e.target.value)}
                maxLength="1000"
                value={goalsTxt}
                className={styles.textArea}
                placeholder="Let project managers know you're available ... 
                     Indicate that you are recruiting ... "
              ></textarea>
            </div>
          </div>

          {/* RIGHT PAGE STRUCTURE */}
          <div className={styles.rightContainer}>
            <div className={styles.content}></div>

            <div className={styles.rowGroup}>
              {/* DIPLOMA CONTENT */}
              <div className={styles.diplomaTxtContent}>
                <h2 className={styles.diplomaTxt}>
                  Diplomas{" "}
                  <span className={styles.diplomaWordsTxt}>
                    {diplomasTxt.length}/1000
                  </span>
                </h2>
                <textarea
                  onChange={(e) => setDiplomasTxt(e.target.value)}
                  maxLength="1000"
                  value={diplomasTxt}
                  className={styles.textDiploma}
                  placeholder="Mention your diplomas or certifications"
                ></textarea>
              </div>

              {/* EXPERIENCES CONTENT */}
              <div className={styles.experiencesTxtContent}>
                <h2 className={styles.experiencesTxt}>
                  Experiences{" "}
                  <span className={styles.experiencesWordsTxt}>
                    {experiencesTxt.length}/1000
                  </span>
                </h2>
                <textarea
                  onChange={(e) => setExperiencesTxt(e.target.value)}
                  maxLength="1000"
                  value={experiencesTxt}
                  className={styles.textExperiences}
                  placeholder="Mention your professional experiences"
                ></textarea>
              </div>
            </div>
            <div className={styles.rowGroup}>
              {/* SKILLS CONTENT */}
              <div className={styles.skillsTxtContent}>
                <h2 className={styles.skillsTxt}>
                  Skills{" "}
                  <span className={styles.skillsWordsTxt}>
                    {skillsTxt.length}/1000
                  </span>
                </h2>
                <textarea
                  onChange={(e) => setSkillsTxt(e.target.value)}
                  maxLength="1000"
                  value={skillsTxt}
                  className={styles.textSkills}
                  placeholder="Mention your skills"
                ></textarea>
              </div>

              {/* PROJECTS CONTENT */}
              <div className={styles.projectsTxtContent}>
                <h2 className={styles.projectsTxt}>
                  AllWithin Projects{" "}
                  <span className={styles.projectsWordsTxt}>
                    {projectsTxt.length}/1000
                  </span>
                </h2>
                <textarea
                  onChange={(e) => setProjectsTxt(e.target.value)}
                  maxLength="1000"
                  value={projectsTxt}
                  className={styles.textProjects}
                  placeholder="Mention your AllWithin projects"
                ></textarea>
              </div>
            </div>
          </div>

          {/* PROFIL EDIT MODAL */}
        </div>
        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className={styles.modalOpen}
        >
          <FontAwesomeIcon
            className={styles.btnClose}
            onClick={closeModal}
            icon={faXmark}
          />
          {/* INPUT MODAL */}
          <div className={styles.inputModal}>
            <div className={styles.inputJob}>
              <h2 className={styles.labelTxt}>Change your job :</h2>
              <input
                name="job"
                onChange={(e) => setJob(e.target.value)}
                value={job}
                className={styles.input}
                placeholder="Job"
              ></input>
            </div>
            <div className={styles.inputLocation}>
              <h2 className={styles.labelTxt}>Change your location :</h2>
              <input
                name="location"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                className={styles.input}
                placeholder="Location"
              ></input>
            </div>
            <div className={styles.inputPhoneNumber}>
              <h2 className={styles.labelTxt}>Change your phone number :</h2>
              <input
                name="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                className={styles.input}
                placeholder="Phone Number"
              ></input>
            </div>
            <div className={styles.inputEmail}>
              <h2 className={styles.labelTxt}>Change your email :</h2>
              <input
                name="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={styles.input}
                placeholder="Email"
              ></input>
            </div>
            <div className={styles.inputSocialNetworks}>
              <h2 className={styles.labelTxt}>
                Change your social profile link :
              </h2>
              <input
                name="SocialNetworks"
                onChange={(e) => setSocialNetworks(e.target.value)}
                value={socialNetworks}
                className={styles.input}
                placeholder="Link to social profile link"
              ></input>
              <input
                name="SocialNetworks"
                onChange={(e) => setSocialNetworks(e.target.value)}
                value={socialNetworks}
                className={styles.input}
                placeholder="Link to social profile link"
              ></input>
              <input
                name="SocialNetworks"
                onChange={(e) => setSocialNetworks(e.target.value)}
                value={socialNetworks}
                className={styles.input}
                placeholder="Link to social profile link"
              ></input>
            </div>
          </div>
        </Modal>
      </form>
    </div>
  );
}

export default Profile;
