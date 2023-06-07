import React, { useEffect, useState } from "react";
import styles from "../styles/MyTeam.module.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareXmark,
  faEnvelope,
  faPhone,
  faFile,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";

function MyTeam() {
  const project = useSelector((state) => state.project.value);
  const [crew, setCrew] = useState([]);
  const [leadder, setLeadder] = useState([]);

  useEffect(() => {
    const projectId = project[0]._id;
    fetch(
      `https://backend-allwithin.vercel.app/projects/crewProject/${projectId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCrew(data.crew);
        setLeadder(data.user);
      });
  }, []);

  console.log(crew);

  return (
    <div className={styles.container}>
      <div>
        <b>{project[0].name}</b>
      </div>
      <div className={styles.cardLead}>
        <b>Lead project</b>
        <img className={styles.photoChef} src={leadder.photo} alt="Photo" />
        {leadder.firstname} {leadder.name}
        <a href={leadder.linkedin}>
          <img
            className={styles.linkedin}
            src="/images/linkedin.png"
            alt="GitHub"
          />
        </a>
        <a href="mailto:{leadder.email}">
          <FontAwesomeIcon
            className={styles.email}
            color="black"
            icon={faEnvelope}
            alt="E-Mail"
          />
        </a>
        <a href="tel: `${leadder.phone}`">
          <FontAwesomeIcon className={styles.phone} icon={faPhone} />
        </a>
      </div>
      <b> Crew project</b>
      <div className={styles.containerCrew}>
        {/* <b>Crew project</b> */}
        {crew.map((data, i) => (
          <div className={styles.cardCrew} key={i}>
            <img className={styles.photo} src={data.photo} />
            <div className={styles.nameJob}>
              <b className={styles.name}>
                {data.firstname} {data.name}
              </b>
              <b>{data.job.name}</b>
            </div>
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
