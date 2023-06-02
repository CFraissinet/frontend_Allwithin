import React, {useEffect, useState}from "react";
import styles from "../styles/MyTeam.module.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareXmark,
  faEnvelope,
  faPhone,
  faFile,
  faSquareCheck
} from "@fortawesome/free-solid-svg-icons";

function MyTeam() {

    const project = useSelector((state) => state.project.value);
    const [crew, setCrew] = useState([])
    const [leadder, setLeadder] = useState([])

    console.log("project", project)

    useEffect(() => {
        const projectId = project[0]._id
        fetch(`http://localhost:3000/projects/crewProject/${projectId}`)
          .then((response) => response.json())
          .then((data) => {
            setCrew(data.crew);
            setLeadder(data.user)
          });
      }, []);

    console.log("crew", crew)
    console.log("leadder", leadder)

return (
    <div className={styles.container}>
        <div>
            <b>{project[0].name}</b>
        </div>
        <div className={styles.cardLead}>
            <b>Lead project</b>
            <img src={leadder.photo} alt="Photo" />
                {leadder.firstname} {leadder.name}
                <div className={styles.containerContact}>
                    {leadder.linkedin}
                    {leadder.email}
                    {leadder.phone}
                </div>
        </div>
        <b> Crew project</b>
        <div className={styles.containerCrew}>
            {/* <b>Crew project</b> */}
            {crew.map((data, i) => (
                <div
                    className={styles.cardCrew}
                    key={i}
                >
                <img className={styles.photo} src={data.photo} />
                <b className={styles.name}>
                  {data.firstname} {data.name}
                </b>
                <a href={data.github}>
                  <img
                    className={styles.contactGitHub}
                    src="/images/github.svg"
                    alt="GitHub"
                  />
                  </a>
                  <a href={data.linkedin}>
                  <img
                    className={styles.linkedin}
                    src="/images/linkedin.png"
                    alt="GitHub"
                  />
                  </a>
                </div>
            ))}
        </div>
    </div>
);
}

export default MyTeam;