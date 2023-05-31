import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faEnvelope,
  faPhone,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Dashboard.module.css";
import { useState, useEffect } from "react";

function DashboardModal(props) {
  const [containerPost, setContainerPost] = useState([]);

  console.log("props", props.data._id);

  useEffect(() => {
    const idOffers = props.data._id;
    fetch(`http://localhost:3000/offers/project/${idOffers}`)
      .then((response) => response.json())
      .then((data) => {
        setContainerPost(data);
        console.log("fetch", data);
      });
  }, []);

  console.log(containerPost);

  return (
    <div className={styles.modalOpen}>
      {props.data.users.length === 0 ? (
        <div className={styles.noFriend}>
          <em>No cadidate, wait !</em>
        </div>
      ) : (
        props.data.users.map((data) => (
          <div className={styles.card}>
            <div className={styles.cardContainer}>
              <img className={styles.photo} src={data.photo} />
              <div className={styles.containerContact}>
                <b className={styles.name}>
                  {data.firstname} {data.name}
                </b>
                <div className={styles.gitHub}>
                  <img
                    className={styles.contactGitHub}
                    src="/images/github.svg"
                    alt="GitHub"
                  />
                  <a href={data.github}>Voir le profil</a>
                </div>
                <div className={styles.linkLinkedin}>
                  <img
                    className={styles.linkedin}
                    src="/images/linkedin.png"
                    alt="GitHub"
                  />
                  <a href={data.linkedin}>Voir le profil</a>
                </div>
                <div className={styles.mail}>
                  <FontAwesomeIcon
                    className={styles.contact}
                    color="black"
                    icon={faEnvelope}
                    alt="E-Mail"
                  />
                  <a href="mailto:{data.email}">{data.email}</a>
                </div>
                <div className={styles.tel}>
                  <FontAwesomeIcon className={styles.contact} icon={faPhone} />
                  <a href="tel: `${data.phone_number}`">{data.phone_number}</a>
                </div>
                <div className={styles.cv}>
                  <FontAwesomeIcon className={styles.contact} icon={faFile} />
                  <a className={styles.cvLink} href={data.cv}>
                    Voir CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default DashboardModal;
