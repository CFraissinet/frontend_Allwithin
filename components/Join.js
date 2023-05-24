import styles from "../styles/Join.module.css";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { useState, useEffect, useRef } from "react";
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
  const [dataProjects, setDataProjects] = useState([]);
  const [job, setJob] = useState("");
  const [jobData, setJobData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const [firstname, setFirstname] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const inputCVRef = useRef(null);
  const [previewCV, setPreviewCV] = useState(false);
  const [CV, setCV] = useState("");
  const [errorCV, setErrorCV] = useState("");

  // FETCHING ALL JOBS
  useEffect(() => {
    fetch("http://localhost:3000/users/jobs")
      .then((response) => response.json())
      .then((data) => {
        setJobData(data.jobs);
      });
  }, []);

  // FETCHING ALL PROJECT FROM DATABASE
  useEffect(() => {
    fetch(`http://localhost:3000/projects/showProjects`)
      .then((response) => response.json())
      .then((data) => {
        setDataProjects(data.data);
      });
  }, []);

  console.log("all projects", dataProjects);

  const openModal = () => {
    setIsOpen(true);
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
    errorColorCV = { color: "#152232" };
  } else {
    errorColorCV = { color: "#FF0000" };
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.searchBox}>
          <div className={styles.inputBox}>
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

        <div className={styles.filterContent}>
          <div className={styles.filter}>
            <span>Front</span>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>

        <div className={styles.projectContainer}>
          {dataProjects.map((data, i) => (
            <div className={styles.projectCard}>
              <div className={styles.leftCard}>
                <span className={styles.cardTitle}>{data.name}</span>
                <span>Location :</span>
                <span>Job position :</span>
                <span>Start date 12/10/23 End date : 12/10/23</span>
              </div>
              <div className={styles.rigthCard}>
                <span className={styles.postDate}>Post created: 12/05/23</span>

                <a onClick={() => console.log("yo")}>
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
          <h1>Project Name :</h1>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
          </p>

          <a className={styles.applyBtn} onClick={openModal}>
            <Button
              text="Apply"
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
          </div>
          <div className={styles.modalInputContainerRight}>
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
              {previewCV && popCV}
              <button onClick={(e) => cvClick(e)} className={styles.cvButton}>
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
          <a>
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
