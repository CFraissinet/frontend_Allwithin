import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faEnvelope,
  faPhone,
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
      <div className={styles.container}>
        <FontAwesomeIcon
          className={styles.btnClose}
          onClick={props.closeModal}
          icon={faXmark}
        />
        <b className={styles.b}>{props.data.jobTitle}</b>
        <div className={styles.containerCard}>
          {props.data.user_Id.map((data) => (
            <div className={styles.card}>
              <div className={styles.cardContainer}>
                <img
                  className={styles.photo}
                  src={data.photo ? data.photo : "images/the-rock.webp"}
                />
                <div className={styles.containerContact}>
                  <b className={styles.name}>
                    {data.firstname} {data.name}
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
                    <a href="mailto:{data.email}">{data.email}</a>
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
  );
}

export default DashboardModal;
