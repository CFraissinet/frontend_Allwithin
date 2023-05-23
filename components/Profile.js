import React, { useState } from "react";
import styles from "../styles/Profile.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const [experiences, setExperiences] = useState("");
  const [counter, setCounter] = useState(0);

  const handleTextArea = (event) => {
    const value = event.target.value;
    setExperiences(value);
    setCounter(value.length);
  };

  return (
    <div className={styles.mainContainer}>
      {/* HEADER */}

      {/* GENERAL PAGE STRUCTURE */}
      <form className={styles.profile} encType="multipart/form-data">
        <div className={styles.container}>
          {/* LEFT PAGE STRUCTURE */}
          <div className={styles.leftContainer}>
            <h2 className={styles.titleBody}>
              My <span className={styles.span}>Profile</span>
            </h2>
            {/* PROFILE EDIT BUTTON */}
            <button className={styles.profileEditButton}>Profile edit</button>

            {/* PICTURE */}
            <div className={styles.presentation}>
              <img
                className={styles.image}
                src="profilePicture.jpg"
                alt="Picture"
              />

              {/* PROFILE CARD */}
              <div className={styles.card}>
                <div className={styles.textContainer}>
                  <span className={styles.firstName}>Maxime </span>
                  <span className={styles.name}>GOMEZ-DURET</span>
                  <p className={styles.job}>Lead Developer</p>
                  <p className={styles.location}>
                    <FontAwesomeIcon
                      className={styles.icon}
                      icon={faLocationDot}
                    />
                    Le Tignet, Provence-Alpes-Côte d'Azur, France
                  </p>
                  <p>
                    <a href="tel:0605040302" className={styles.phoneContact}>
                      <FontAwesomeIcon className={styles.icon} icon={faPhone} />
                      06.05.04.03.02
                    </a>
                  </p>
                  <a
                    href="mailto:maxime.gomez-duret@gmail.com"
                    className={styles.mailContact}
                  >
                    <FontAwesomeIcon
                      className={styles.icon}
                      icon={faEnvelope}
                    />
                    maxime.gomez-duret@gmail.com
                  </a>
                  <p className={styles.socialsNetwork}>
                    <a href="https://twitter.com/in/my-profile-twitter">
                      <FontAwesomeIcon icon={faTwitter} /> Twitter
                    </a>
                    <a href="https://github.com/my-profile">
                      <FontAwesomeIcon icon={faGithub} /> GitHub
                    </a>
                    <a href="https://linkedin.com/in/my-profile-linkedin">
                      <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* GOALS */}
            <div className={styles.txtContent}>
              <h2 className={styles.titleTxtContent}>
                My Goals{" "}
                <small className={styles.counter}>{counter}/1000</small>
              </h2>
            </div>

            {/* GOALS CONTENT */}
            <div className={styles.areaTxtContent}>
              <textarea
                onChange={(e) => handleTextArea(e)}
                maxLength="1000"
                value={experiences}
                className={styles.textArea}
                placeholder="Let project managers know you're available ... 
                     Indicate that you are recruiting ... "
              ></textarea>
            </div>

            {/* AVAILABILITY BUTTONS */}
            <div className={styles.availablity}>
              <button className={styles.availableButton}>I'm available</button>
              <button className={styles.hireButton}>I hire</button>
            </div>
          </div>

          {/* RIGHT PAGE STRUCTURE */}
          <div className={styles.rightContainer}>
            <div className={styles.content}></div>

            {/* DIPLOMA CONTENT */}
            <div className={styles.diplomaTxtContent}>
              <h2 className={styles.diplomaTxt}>
                My Diplomas{" "}
                <span className={styles.diplomaWordsTxt}>{counter}/1000</span>
              </h2>
            </div>
            <textarea
              onChange={(e) => handleTextArea(e)}
              maxLength="1000"
              value={experiences}
              className={styles.textDiploma}
              placeholder="Mention your diplomas or certifications"
            ></textarea>

            {/* EXPERIENCES CONTENT */}
            <div className={styles.experiencesTxtContent}>
              <h2 className={styles.experiencesTxt}>
                My Experiences{" "}
                <span className={styles.experiencesWordsTxt}>
                  {counter}/1000
                </span>
              </h2>
            </div>
            <textarea
              onChange={(e) => handleTextArea(e)}
              maxLength="1000"
              value={experiences}
              className={styles.textExperiences}
              placeholder="Mention your professional experiences"
            ></textarea>

            {/* SKILLS CONTENT */}
            <div className={styles.skillsTxtContent}>
              <h2 className={styles.skillsTxt}>
                My Skills{" "}
                <span className={styles.skillWordsTxt}>{counter}/1000</span>
              </h2>
            </div>
            <textarea
              onChange={(e) => handleTextArea(e)}
              maxLength="1000"
              value={experiences}
              className={styles.textSkills}
              placeholder="Mention your skills"
            ></textarea>

            {/* PROJECTS CONTENT */}
            <div className={styles.projectsTxtContent}>
              <h2 className={styles.projectsTxt}>
                My AllWithIn Projects{" "}
                <span className={styles.projectsWordsTxt}>{counter}/1000</span>
              </h2>
            </div>
            <textarea
              onChange={(e) => handleTextArea(e)}
              maxLength="1000"
              value={experiences}
              className={styles.textProjects}
              placeholder="Mention your AllWithIn projects"
            ></textarea>

            {/* BUTTON GO TO DASHBOARD */}
            <div className={styles.buttonsDashboard}>
              <Link href="/signIn">
                <span className={styles.btnSIgnIn}>Go to Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
