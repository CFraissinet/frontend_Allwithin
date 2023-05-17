import Link from "next/link";
import styles from "../styles/CreateProject.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function CreateProject() {
  return (
    <div className={styles.background}>
      <div className={styles.homeContainer}>
        <div className={styles.container}>
         {/*--------------------------- Nav ------------------------------*/}
          <div className={styles.navbar}>
            <div className={styles.logoContainer}>
              <img
                className={styles.logo}
                src="/path/to/your/logo.png"
                alt="Logo"
              />
            </div>
            <div className={styles.buttons}>
              <Link href="/lobby">
                <button className={styles.btnNav}>My lobby</button>
              </Link>
              <Link href="/signUp">
                <button className={styles.btnNav}>My messages</button>
              </Link>
            </div>
          </div>
        </div>
        {/* navbar end*/}
        <div className={styles.formContainer}>
        {/*--------------------------- Nav ------------------------------*/}

          <h1>Create Your Project</h1>

        {/*--------------------------- Forms ------------------------------*/}
          <div className={styles.inputDiv}>
            <div className={styles.formGroup}>
              <label htmlFor="projectName">Project Name:</label>
              <input
                type="text"
                id="projectName"
                className={styles.input}
                placeholder="Enter project name"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="text"
                id="startDate"
                className={styles.input}
                placeholder="Enter start date"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="endDate">End Date:</label>
              <input
                type="text"
                id="endDate"
                className={styles.input}
                placeholder="Enter end date"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="jobProfile">Job Profile:</label>
              <input
                type="text"
                id="jobProfile"
                className={styles.input}
                placeholder="Enter job profile"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="memberCount">Member Count:</label>
              <div className={styles.counter}>
                <button>-</button>
                <span>0</span>
                <button>+</button>
              </div>
            </div>
            <button className={styles.addButton}>Add Member</button>
          </div>
         {/*--------------------------- Forms ------------------------------*/}
        </div>
      </div>
    </div>
  );
}

export default CreateProject;
