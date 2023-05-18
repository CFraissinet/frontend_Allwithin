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

{/* contien la div formContainer et txtAreaContainer */}
        <div className={styles.leftRightContainer}>

          <h1>Create Your Project</h1>
       <div className={styles.leftRight} >
        <div className={styles.formContainer}>
          {/*--------------------------- Nav ------------------------------*/}


          {/*--------------------------- Forms ------------------------------*/}
          <div className={styles.inputDiv}>
              <div className={`${styles.inputBox} ${styles.labelStyle}`}>
              <label htmlFor="projectName">Project Name:</label>
              <input
                type="text"
                id="projectName"
                className={styles.input}
                placeholder="Enter project name"
              />
            </div>
            {/*input  Start Date & End Date FORMS */}
            <div className={styles.endSartContainer}>
            <div className={`${styles.inputBox} ${styles.labelStyle}`}>
                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="text"
                  id="startDate"
                  className={styles.endStart}
                  placeholder="Enter start date"
                />
              </div>

              <div className={`${styles.inputBox} ${styles.labelStyle}`}>
                <label htmlFor="endDate">End Date:</label>
                <input
                  type="text"
                  id="endDate"
                  className={styles.endStart}
                  placeholder="Enter end date"
                />
              </div>
            </div>
            {/* input Start Date & End Date FORMS */}

            {/* input job Profile & member count */}

            <div className={styles.jobInputContainer}>
             
             
            <div className={`${styles.inputBox} ${styles.labelStyle}`}>
                <label htmlFor="jobProfile">Job Profile:</label>
                <input
                  type="text"
                  id="jobProfile"
                  className={styles.jobProfile}
                  placeholder="Enter job profile"
                />
              </div>      
                <div className={styles.counter}>
                  <div>
                    <button>-</button>
                    <span>0</span>
                    <button>+</button>
                  </div>
                  <button>X</button>
                </div>
            </div>
            <button className={styles.addButton}>Add Member</button>
            {/* input job Profile & member count */}
          </div>
        </div>
          {/*--------------------------- Forms ------------------------------*/}
    

        {/*------------------------- div txtAreaContainer ----------------------*/}
        <div  className={styles.txtAreaContainer}>
        <label className={styles.labelStyle} htmlFor="projectDescription">Project description:</label>
    <textarea 
    maxLength="1000"
    className={styles.txtArea} 
    placeholder="Enter project description"
    ></textarea>
    <div className={styles.btnCreatCountainer}>
    <button className={styles.btnCreateProject}> CREATE PROJECT</button>
    </div>
        </div>
        </div>
        {/*------------------------- div txtAreaContainer fin ----------------------*/}
        </div>
        {/* fin  div leftRightContainer */}
      </div>
    </div>
  );
}
export default CreateProject; 
