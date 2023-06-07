import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareXmark,
  faEnvelope,
  faPhone,
  faFile,
  faSquareCheck
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Dashboard.module.css";
import { useState, useEffect } from "react";

function DashboardModal(props) {

  const [people, setPeople] = useState(props.data.users)
  
  const handleRefuseClick = (id, users) => {
    fetch("http://localhost:3000/offers/confirm", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        users: users._id
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setPeople(data.users)
      })
  };

  const handleAcceptClick = (id, users, projectId) => {
    fetch("http://localhost:3000/offers/confirm", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        users: users._id,
        projectId: projectId
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setPeople(data.users);})
      .then(fetch("http://localhost:3000/projects/addCrew", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            users: users._id,
            projectId: projectId
          })
        })
          .then((response) => response.json())
      )};

  return (
    <div className={styles.modalOpen}>
      {props.data.users.length === 0 ? (
        <div className={styles.noFriend}>
          <em>No cadidate for {props.data.offers.job.label}, wait !</em>
        </div>
      ) : (
        people.map((data) => (
          <div className={styles.card}>
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
                  <a href="mailto:{data.email}">
                  <FontAwesomeIcon
                    className={styles.email}
                    color="black"
                    icon={faEnvelope}
                    alt="E-Mail"
                  />
                  </a>
                  <a href="tel: `${data.phone_number}`">
                  <FontAwesomeIcon className={styles.phone} icon={faPhone} />
                  </a>
                  <a className={styles.cvLink} href={data.cv}>
                  <FontAwesomeIcon className={styles.cv} icon={faFile} />
                  </a>
                  <FontAwesomeIcon className={styles.accept} icon={faSquareCheck} onClick={() => handleAcceptClick(props.data._id, data, props.data.project)} />
                  <FontAwesomeIcon className={styles.refuse} icon={faSquareXmark} onClick={() => handleRefuseClick(props.data._id, data)} />

          </div>
        ))
      )}
    </div>
  );
}

export default DashboardModal;
