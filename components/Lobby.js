import styles from "../styles/Lobby.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  faUser,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

function Lobby() {
  const project = useSelector((state) => state.project.value);
  const [dataProjects, setDataProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/projects")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.buttonConnection}>
          <button className={styles.button}>My lobby</button>
          <button className={styles.button}>My messages</button>
          <FontAwesomeIcon className={styles.userSection} icon={faUser} />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.leftBody}>
          <div className={styles.topList}>
            <h2 className={styles.titleBody}>
              Your <span className={styles.span}>Projects</span>
            </h2>
            <div className={styles.midLeft}>
              <div>
                <FontAwesomeIcon className={styles.arrow} icon={faArrowLeft} />
              </div>
              <div className={styles.projectList}>
                <button className={styles.projectButton}>PROJECT 1</button>
                <button className={styles.projectButton}>PROJECT 2</button>
                <button className={styles.projectButton}>PROJECT 3</button>
                <button className={styles.projectButton}>PROJECT 4</button>
                <button className={styles.projectButton}>PROJECT 5</button>
              </div>
              <div>
                <FontAwesomeIcon className={styles.arrow} icon={faArrowRight} />
              </div>
            </div>
          </div>
          <div className={styles.botList}>
            <button className={styles.actionProject}>
              Create a new project
            </button>
            <button className={styles.actionProject}>Join a project</button>
          </div>
        </div>
        <div className={styles.rightBody}>
          <div className={styles.infoProject}>
            <h2 className={styles.rightTitle}>Project 1</h2>
            <textarea
              className={styles.projectDescription}
              placeholder="Project description"
            ></textarea>
            <button className={styles.buttonDashboard}>GO TO DASHBOARD</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
