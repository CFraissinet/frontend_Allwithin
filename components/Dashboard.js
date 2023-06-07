import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "../styles/Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import DashboardModal from "./DasboardModal";

function Dashboard() {
  const project = useSelector((state) => state.project.value);
  const [btnProject, setBtnProject] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const dispatch = useDispatch();
  const [modalData, setModalData] = useState(null);
  const [myTeamData, setMyTeamData] = useState(null);

  useEffect(() => {
    const idProject = project[0]._id;
    fetch(`https://backend-allwithin.vercel.app/offers/project/${idProject}`)
      .then((response) => response.json())
      .then((data) => {
        setProjectData(data.projectData);
      });
  }, []);

  function goMyTeam(data) {
    location.href = "/myTeam";
    setMyTeamData(data);
  }

  const handleOfferBtn = (data) => {
    setModalData(data);
  };

  const toolsBtn = (
    <>
      <button className={styles.btnModal}>Chat</button>
      <button className={styles.btnModal}>Drive</button>
      <a href="https://github.com/new">
        <button className={styles.btnModal}>Github</button>
      </a>
      <button className={styles.btnModal}>Calendar</button>
      <button className={styles.btnModal} onClick={goMyTeam}>
        My team
      </button>
    </>
  );

  return (
    <div className={styles.main}>
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
                      onClick={() => handleOfferBtn(data)}
                      className={styles.post}
                      key={i}
                    >
                      {data.offers.job.label}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.midCard}>
                {modalData
                  ? [<DashboardModal data={modalData} />]
                  : [
                      <div className={styles.rightContent}>
                        <b>Description :</b>
                        {project[0].description}
                      </div>,
                    ]}
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
