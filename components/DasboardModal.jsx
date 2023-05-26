import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faEnvelope,
  faPhone,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Dashboard.module.css";

function DashboardModal(props) {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      className={styles.modalOpen}
    >
      <FontAwesomeIcon
        className={styles.btnClose}
        onClick={props.closeModal}
        icon={faXmark}
      />
      <div className={styles.container}>
        <div className={styles.containerCard}>
          {props.data.user_Id.map((data) => (
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
                    <FontAwesomeIcon
                      className={styles.contact}
                      icon={faPhone}
                    />
                    <a href="tel: `${data.phone_number}`">
                      {data.phone_number}
                    </a>
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
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default DashboardModal;
