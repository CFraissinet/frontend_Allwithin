import styles from "../styles/Lobby.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  faUser,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { addProject } from "../reducers/project";

function Lobby() {
  const project = useSelector((state) => state.project.value);
  //user reducer
  const user = useSelector((state) => state.user.value);
  //hook for user's projects
  const [dataProjects, setDataProjects] = useState([]);
  const [selectProject, setSelectProject] = useState({});
  const dispatch = useDispatch();

  // useEffect allowing to connect to the backend to retrieve the projects related to the person connected to the component loading
  useEffect(() => {
    fetch(`http://localhost:3000/projects/token/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        setDataProjects(data.projects);
        if (data.projects.length !== 0) {
          setSelectProject(data.projects[0]);
        } else {
          setSelectProject({ name: "", description: "" });
        }
      });
  }, []);

  //To upload to the store and find the project in the project dashboard page
  const sendProjectDasboard = (project) => {
    console.log(project);
    dispatch(addProject(project));
  };

  const projectData = dataProjects.map((data, i) => {
    return (
      <button
        key={i}
        onClick={() => showProject(data._id)}
        className={styles.projectButton}
      >
        {data.name}
      </button>
    );
  });

  function showProject(idProject) {
    setSelectProject(
      dataProjects[dataProjects.findIndex((data) => data._id === idProject)]
    );
  }

  // if (!selectProject.name) {
  //   setSelectProject({ name: "", description: "" });
  // }

  return (
    <div className={styles.container}>
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
              <div className={styles.projectList}>{projectData}</div>
              <div>
                <FontAwesomeIcon className={styles.arrow} icon={faArrowRight} />
              </div>
            </div>
          </div>
          <div className={styles.botList}>
            <Link href="/createProject">
              <button className={styles.actionProject}>
                Create a new project
              </button>
            </Link>
            <Link href="/join">
              <button className={styles.actionProject}>Join a project</button>
            </Link>
          </div>
        </div>
        <div className={styles.rightBody}>
          <div className={styles.infoProject}>
            <h2 className={styles.rightTitle}>{selectProject.name}</h2>
            <textarea
              className={styles.projectDescription}
              placeholder="Project description"
              value={selectProject.description}
            ></textarea>
            <Link href="/dashboard">
              <button
                onClick={() => sendProjectDasboard(selectProject)}
                className={styles.buttonDashboard}
              >
                GO TO DASHBOARD
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
