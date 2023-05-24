import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { removeProject } from "../reducers/project";
import DashboardModal from "./DasboardModal";

function Dashboard() {
  const project = useSelector((state) => state.project.value);
  const [btnProject, setBtnProject] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const dispatch = useDispatch();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  function openModal(data) {
    setModalData(data);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const idProject = project[0]._id;
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
      {modalData && (
        <DashboardModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          data={modalData}
        />
      )}

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
                      onClick={() => openModal(data)}
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
    </div>
  );
}

export default Dashboard;
