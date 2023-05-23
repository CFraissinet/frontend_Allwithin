import React, { useState, useEffect } from "react";
import styles from "../styles/Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { removeProject } from "../reducers/project";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const project = useSelector((state) => state.project.value);
  // console.log(project);
  const [btnProject, setBtnProject] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [projectData, setProjectData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const idProject = project[0]._id;
    console.log(idProject);
    fetch(`http://localhost:3000/offers/${idProject}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.projectData);
        setProjectData(data.projectData);
        console.log(data.projectData);
        // if (dataProjects.length !== 0) {
        //   setSelectProject(data.projects[0]);
        // } else {
        //   setSelectProject({ name: "", description: "" });
        // }
      });
  }, []);

  console.log(projectData);

  function openModal(title) {
    setJobTitle(title);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const toolsBtn = (
    <>
      <button className={styles.btnModal}>Chat</button>
      <button className={styles.btnModal}>Drive</button>
      <button className={styles.btnModal}>Github</button>
      <button className={styles.btnModal}>Calendar</button>
      <button className={styles.btnModal}>My team</button>
    </>
  );

  //For clear store
  const clearProject = (project) => {
    dispatch(removeProject(project));
    setProjectData([]);
    location.href = "/lobby";
  };

  return (
    <div className={styles.main}>
      <div className={styles.navBar}>
        {/* NAV BAR */}
        <div className={styles.btnContainer}>
          <button
            onClick={() => clearProject(project)}
            className={styles.btnNavBar}
          >
            My lobby
          </button>
          <button className={styles.btnNavBar}>My message</button>
        </div>
      </div>
      <div className={styles.component}>
        {/* COMPONENT WITH BUTTON LEFT AND DASHBOARD */}
        <div className={styles.containerBtn}>{btnProject && toolsBtn}</div>
        <div className={styles.containerDashboard}>
          <div className={styles.dashboard}>
            <h2 className={styles.txtCard1}>
              {project[0].name} <b className={styles.aDashboard}>DASHBOARD</b>
            </h2>
            <div className={styles.midContainer}>
              <div className={styles.midCard}>
                <div className={styles.containerPost}>
                  <b className={styles.postPending}>Post Pending :</b>
                  {projectData.map((data, i) => (
                    <div
                      onClick={() => openModal(data.name)}
                      className={styles.post}
                      key={i}
                    >
                      {data.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.midCard}>
                <div className={styles.ctnDescription}>
                  <b>Description :</b>
                  <div className={styles.txtDescription}>
                    {project[0].description}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.containerStartBtn}>
              <button
                onClick={() => setBtnProject(true)}
                className={styles.btnStart}
              >
                Start project
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modalOpen}
      >
        <div className={styles.container}>
          <FontAwesomeIcon
            className={styles.btnClose}
            onClick={closeModal}
            icon={faXmark}
          />
          <b className={styles.b}>{jobTitle}</b>
          <div className={styles.containerCard}>
            {projectData.map((data, i) => (
              <div className={styles.card} key={i}>
                <div className={styles.cardContainer}>
                  <img className={styles.photo} src={data.user_Id[0].photo} />
                  <div className={styles.containerContact}>
                    <b className={styles.name}>
                      {data.user_Id[0].firstname} {data.user_Id[0].name}
                    </b>
                    <div className={styles.gitHub}>
                      <img
                        className={styles.contactGitHub}
                        src="/images/github-mark.svg"
                        alt="GitHub"
                      />
                      <b>TheRock</b>
                    </div>
                    <div className={styles.mail}>
                      <FontAwesomeIcon
                        className={styles.contact}
                        color="black"
                        icon={faEnvelope}
                        alt="E-Mail"
                      />
                      <a href="mailto:{data.user_Id[0].email}">
                        {data.user_Id[0].email}
                      </a>
                    </div>
                    <div className={styles.tel}>
                      <FontAwesomeIcon icon={faPhone} />
                      <a href="tel:0609080706">06.09.08.07.06</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Dashboard;
