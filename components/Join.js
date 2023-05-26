import styles from "../styles/Join.module.css";
import Link from "next/link";
import Button from "../components/Button";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import React from "react";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

function Join() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataOffers, setDataOffers] = useState([]);
  const [job, setJob] = useState("");
  const [jobData, setJobData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const inputCVRef = useRef(null);
  const [previewCV, setPreviewCV] = useState(false);
  const [CV, setCV] = useState("");
  const [errorCV, setErrorCV] = useState("");
  const [userData, setUserData] = useState({});
  const [selectProject, setSelectProject] = useState({});
  console.log("SELECT", selectProject);

  const user = useSelector((state) => state.user.value);
  // FETCHING USER'S FULL DATA
  // FETCHING ALL OFFERS FROM DATABASE
  useEffect(() => {
    fetch(`http://localhost:3000/users/userData/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.userData);
      });

    fetch(`http://localhost:3000/offers/allOffers`)
      .then((response) => response.json())
      .then((data) => {
        setDataOffers(data.allOffers);
        console.log("ALL OFFERS", data.allOffers);
      });
  }, []);

  const handleChangeFirstname = (firstname) => {
    setUserData({ ...userData, firstname });
  };

  const handleChangeName = (name) => {
    setUserData({ ...userData, name });
  };

  const handleChangeEmail = (email) => {
    setUserData({ ...userData, email });
  };

  const handleChangePhone = (phone) => {
    setUserData({ ...userData, phone });
  };

  const handleApplyBtn = (selectProject) => {
    fetch("http://localhost:3000/offers/addUserIdOnOffer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        offerId: selectProject.offers.job.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.msg);
      });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const cvClick = (e) => {
    e.preventDefault();
    // Click sur l'input moche masqué
    inputCVRef.current.click();
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

  const popCV = (
    <div className={styles.pdf}>
      <Document file={CV}>
        <Page height={100} pageNumber={pageNumber} renderTextLayer={false} />
      </Document>
    </div>
  );

  // Styling text color for error messages
  let errorColorCV;
  if (previewCV) {
    errorColorCV = { color: "#87c0cd" };
  } else {
    errorColorCV = { color: "#FF0000" };
  }

  const signInToApply = () => {
    location.href = "/signIn";
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.searchBox}>
          <div className={styles.doubleInputBox}>
            <input
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.input}
              placeholder="What are you looking for ?"
            ></input>
            <input
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.input}
              placeholder="Where ?"
            ></input>
          </div>
          <div className={styles.buttonBox}>
            <a>
              <Button
                text="Search"
                backgroundColor="#87c0cd"
                borderColor="#87c0cd"
                textColor="#152232"
                backgroundColorHover="#87c0cd"
                borderColorHover="#87c0cd"
                textColorHover="white"
              />
            </a>
            <a>
              <Button
                text="Location"
                backgroundColor="#87c0cd"
                borderColor="#87c0cd"
                textColor="#152232"
                backgroundColorHover="#87c0cd"
                borderColorHover="#87c0cd"
                textColorHover="white"
              />
            </a>
          </div>
        </div>

        <div className={styles.filterContent}></div>

        <div className={styles.projectContainer}>
          {dataOffers.map((data, i) => (
            <div className={styles.projectCard}>
              <div className={styles.leftCard}>
                <span className={styles.cardTitle}>{data.project.name}</span>
                <span>Offer : {data.offers.job.label}</span>
                <span>
                  Start {data.project.start_date} End date :{" "}
                  {data.project.end_date}
                </span>
              </div>
              <div className={styles.rigthCard}>
                <a onClick={() => setSelectProject(data)}>
                  <Button
                    text="More details"
                    backgroundColor="#87c0cd"
                    borderColor="#87c0cd"
                    textColor="#152232"
                    backgroundColorHover="#87c0cd"
                    borderColorHover="#87c0cd"
                    textColorHover="white"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.projectContent}>
          {selectProject.offers
            ? [
                <div>
                  <h1>
                    Offer available : {""}
                    {selectProject.offers.job.label}
                  </h1>
                  <p>
                    Project desciption : {selectProject.project.description}
                  </p>
                  <p>Start {selectProject.project.start_date}</p>
                  <p>End date : {selectProject.project.end_date}</p>

                  {user.token
                    ? [
                        <a
                          className={styles.applyBtn}
                          onClick={() => handleApplyBtn(selectProject)}
                        >
                          <Button
                            text="Apply"
                            backgroundColor="#87c0cd"
                            borderColor="#87c0cd"
                            textColor="#152232"
                            backgroundColorHover="#87c0cd"
                            borderColorHover="#87c0cd"
                            textColorHover="white"
                          />
                        </a>,
                      ]
                    : [
                        <Link href="/signIn">
                          <div className={styles.applyBtn}>
                            <Button
                              text="Sign in to apply"
                              backgroundColor="#87c0cd"
                              borderColor="#87c0cd"
                              textColor="#152232"
                              backgroundColorHover="#87c0cd"
                              borderColorHover="#87c0cd"
                              textColorHover="white"
                            />
                          </div>
                        </Link>,
                      ]}
                </div>,
              ]
            : [<h1>Select a project</h1>]}

          {/* {user.token
            ? [
                <a
                  className={styles.applyBtn}
                  onClick={() => handleApplyBtn(selectProject)}
                >
                  <Button
                    text="Apply"
                    backgroundColor="#87c0cd"
                    borderColor="#87c0cd"
                    textColor="#152232"
                    backgroundColorHover="#87c0cd"
                    borderColorHover="#87c0cd"
                    textColorHover="white"
                  />
                </a>,
              ]
            : [
                <Link href="/signIn">
                  <div className={styles.applyBtn}>
                    <Button
                      text="Sign in to apply"
                      backgroundColor="#87c0cd"
                      borderColor="#87c0cd"
                      textColor="#152232"
                      backgroundColorHover="#87c0cd"
                      borderColorHover="#87c0cd"
                      textColorHover="white"
                    />
                  </div>
                </Link>,
              ]} */}
        </div>
      </div>
      <Modal
        className={styles.modal}
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className={styles.modalTop}>
          <div className={styles.modalInputContainerLeft}>
            <div className={styles.inputBox}>
              <h2 className={styles.labelTxt}>Enter your firstname :</h2>
              <input
                name="firstname"
                onChange={(e) => handleChangeFirstname(e.target.value)}
                value={userData.firstname}
                className={styles.input}
                placeholder="John"
              ></input>
            </div>
            <div className={styles.inputBox}>
              <h2 className={styles.labelTxt}>Enter your name :</h2>
              <input
                onChange={(e) => handleChangeName(e.target.value)}
                value={userData.name}
                className={styles.input}
                placeholder="Doe"
              ></input>
            </div>
            <div className={styles.inputBox}>
              <h2 className={styles.labelTxt}>Enter your e-mail :</h2>
              <input
                onChange={(e) => handleChangeEmail(e.target.value)}
                value={userData.email}
                className={styles.input}
                placeholder="email@gmail.com"
              ></input>
            </div>
          </div>
          <div className={styles.modalInputContainerRight}>
            <div className={styles.inputBox}>
              <h2 className={styles.labelTxt}>Enter your phone number :</h2>
              <input
                onChange={(e) => handleChangePhone(e.target.value)}
                value={userData.phone}
                className={styles.input}
                placeholder="########"
              ></input>
            </div>
            <div className={styles.inputBox}>
              <h2 className={styles.labelTxt}>Select a job post :</h2>
              <select
                onChange={(e) => setJob(e.target.value)}
                className={styles.dropMenu}
                name="language"
                id="language"
              >
                <option value="" defaultValue>
                  Drop & Select
                </option>

                {jobData.map((data, i) => (
                  <option key={i} value={data._id}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.cvButtonContent}>
              <button onClick={(e) => cvClick(e)} className={styles.cvButton}>
                Join your CV
              </button>

              {previewCV && popCV}
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
          </div>
        </div>
        <div className={styles.modalBot}>
          <a>
            <Button
              text="Apply"
              backgroundColor="white"
              borderColor="#152232"
              textColor="#152232"
              backgroundColorHover="#87c0cd"
              borderColorHover="white"
              textColorHover="#152232"
            />
          </a>
          <a onClick={closeModal}>
            <Button
              text="Cancel"
              backgroundColor="#152232"
              borderColor="#152232"
              textColor="white"
              borderColorHover="white"
              textColorHover="white"
            />
          </a>
        </div>
      </Modal>
    </div>
  );
}

export default Join;
