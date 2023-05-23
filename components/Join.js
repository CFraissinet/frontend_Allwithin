import styles from "../styles/Join.module.css";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import React from "react";

function Join() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.searchBox}>
          <div className={styles.inputBox}>
            <input
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.input}
              placeholder="What are you looking for ?"
            ></input>
            <input
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.input}
              placeholder="Where ?"
            ></input>
          </div>
          <div className={styles.buttonBox}>
            <a>
              <Button
                text="Search"
                backgroundColor="#87c0cd"
                borderColor="#87c0cd"
                textColor="#152232"
                backgroundColorHover="#87c0cd"
                borderColorHover="#87c0cd"
                textColorHover="white"
              />
            </a>
            <a>
              <Button
                text="Location"
                backgroundColor="#87c0cd"
                borderColor="#87c0cd"
                textColor="#152232"
                backgroundColorHover="#87c0cd"
                borderColorHover="#87c0cd"
                textColorHover="white"
              />
            </a>
          </div>
        </div>

        <div className={styles.filterContent}>
          <div className={styles.filter}>
            <span>Front</span>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>

        <div className={styles.projectContainer}>
          <div className={styles.projectCard}>
            <div className={styles.leftCard}>
              <span className={styles.cardTitle}>Project name</span>
              <span>Location :</span>
              <span>Job position :</span>
              <span>Start date 12/10/23 End date : 12/10/23</span>
            </div>
            <div className={styles.rigthCard}>
              <span className={styles.postDate}>Post created: 12/05/23</span>

              <a onClick={() => console.log("yo")}>
                <Button
                  text="More details"
                  backgroundColor="#87c0cd"
                  borderColor="#87c0cd"
                  textColor="#152232"
                  backgroundColorHover="#87c0cd"
                  borderColorHover="#87c0cd"
                  textColorHover="white"
                />
              </a>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.leftCard}>
              <span className={styles.cardTitle}>Project name</span>
              <span>Location :</span>
              <span>Job position :</span>
              <span>Start date 12/10/23 End date : 12/10/23</span>
            </div>
            <div className={styles.rigthCard}>
              <span className={styles.postDate}>Post created: 12/05/23</span>

              <a onClick={() => console.log("yo")}>
                <Button
                  text="More details"
                  backgroundColor="#87c0cd"
                  borderColor="#87c0cd"
                  textColor="#152232"
                  backgroundColorHover="#87c0cd"
                  borderColorHover="#87c0cd"
                  textColorHover="white"
                />
              </a>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.leftCard}>
              <span className={styles.cardTitle}>Project name</span>
              <span>Location :</span>
              <span>Job position :</span>
              <span>Start date 12/10/23 End date : 12/10/23</span>
            </div>
            <div className={styles.rigthCard}>
              <span className={styles.postDate}>Post created: 12/05/23</span>

              <a onClick={() => console.log("yo")}>
                <Button
                  text="More details"
                  backgroundColor="#87c0cd"
                  borderColor="#87c0cd"
                  textColor="#152232"
                  backgroundColorHover="#87c0cd"
                  borderColorHover="#87c0cd"
                  textColorHover="white"
                />
              </a>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.leftCard}>
              <span className={styles.cardTitle}>Project name</span>
              <span>Location :</span>
              <span>Job position :</span>
              <span>Start date 12/10/23 End date : 12/10/23</span>
            </div>
            <div className={styles.rigthCard}>
              <span className={styles.postDate}>Post created: 12/05/23</span>

              <a onClick={() => console.log("yo")}>
                <Button
                  text="More details"
                  backgroundColor="#87c0cd"
                  borderColor="#87c0cd"
                  textColor="#152232"
                  backgroundColorHover="#87c0cd"
                  borderColorHover="#87c0cd"
                  textColorHover="white"
                />
              </a>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.leftCard}>
              <span className={styles.cardTitle}>Project name</span>
              <span>Location :</span>
              <span>Job position :</span>
              <span>Start date 12/10/23 End date : 12/10/23</span>
            </div>
            <div className={styles.rigthCard}>
              <span className={styles.postDate}>Post created: 12/05/23</span>

              <a onClick={() => console.log("yo")}>
                <Button
                  text="More details"
                  backgroundColor="#87c0cd"
                  borderColor="#87c0cd"
                  textColor="#152232"
                  backgroundColorHover="#87c0cd"
                  borderColorHover="#87c0cd"
                  textColorHover="white"
                />
              </a>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.leftCard}>
              <span className={styles.cardTitle}>Project name</span>
              <span>Location :</span>
              <span>Job position :</span>
              <span>Start date 12/10/23 End date : 12/10/23</span>
            </div>
            <div className={styles.rigthCard}>
              <span className={styles.postDate}>Post created: 12/05/23</span>

              <a onClick={() => console.log("yo")}>
                <Button
                  text="More details"
                  backgroundColor="#87c0cd"
                  borderColor="#87c0cd"
                  textColor="#152232"
                  backgroundColorHover="#87c0cd"
                  borderColorHover="#87c0cd"
                  textColorHover="white"
                />
              </a>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.leftCard}>
              <span className={styles.cardTitle}>Project name</span>
              <span>Location :</span>
              <span>Job position :</span>
              <span>Start date 12/10/23 End date : 12/10/23</span>
            </div>
            <div className={styles.rigthCard}>
              <span className={styles.postDate}>Post created: 12/05/23</span>

              <a onClick={() => console.log("yo")}>
                <Button
                  text="More details"
                  backgroundColor="#87c0cd"
                  borderColor="#87c0cd"
                  textColor="#152232"
                  backgroundColorHover="#87c0cd"
                  borderColorHover="#87c0cd"
                  textColorHover="white"
                />
              </a>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.leftCard}>
              <span className={styles.cardTitle}>Project name</span>
              <span>Location :</span>
              <span>Job position :</span>
              <span>Start date 12/10/23 End date : 12/10/23</span>
            </div>
            <div className={styles.rigthCard}>
              <span className={styles.postDate}>Post created: 12/05/23</span>

              <a onClick={() => console.log("yo")}>
                <Button
                  text="More details"
                  backgroundColor="#87c0cd"
                  borderColor="#87c0cd"
                  textColor="#152232"
                  backgroundColorHover="#87c0cd"
                  borderColorHover="#87c0cd"
                  textColorHover="white"
                />
              </a>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.leftCard}>
              <span className={styles.cardTitle}>Project name</span>
              <span>Location :</span>
              <span>Job position :</span>
              <span>Start date 12/10/23 End date : 12/10/23</span>
            </div>
            <div className={styles.rigthCard}>
              <span className={styles.postDate}>Post created: 12/05/23</span>

              <a onClick={() => console.log("yo")}>
                <Button
                  text="More details"
                  backgroundColor="#87c0cd"
                  borderColor="#87c0cd"
                  textColor="#152232"
                  backgroundColorHover="#87c0cd"
                  borderColorHover="#87c0cd"
                  textColorHover="white"
                />
              </a>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.leftCard}>
              <span className={styles.cardTitle}>Project name</span>
              <span>Location :</span>
              <span>Job position :</span>
              <span>Start date 12/10/23 End date : 12/10/23</span>
            </div>
            <div className={styles.rigthCard}>
              <span className={styles.postDate}>Post created: 12/05/23</span>

              <a onClick={() => console.log("yo")}>
                <Button
                  text="More details"
                  backgroundColor="#87c0cd"
                  borderColor="#87c0cd"
                  textColor="#152232"
                  backgroundColorHover="#87c0cd"
                  borderColorHover="#87c0cd"
                  textColorHover="white"
                />
              </a>
            </div>
          </div>
          <div className={styles.projectCard}>
            <div className={styles.leftCard}>
              <span className={styles.cardTitle}>Project name</span>
              <span>Location :</span>
              <span>Job position :</span>
              <span>Start date 12/10/23 End date : 12/10/23</span>
            </div>
            <div className={styles.rigthCard}>
              <span className={styles.postDate}>Post created: 12/05/23</span>

              <a onClick={() => console.log("yo")}>
                <Button
                  text="More details"
                  backgroundColor="#87c0cd"
                  borderColor="#87c0cd"
                  textColor="#152232"
                  backgroundColorHover="#87c0cd"
                  borderColorHover="#87c0cd"
                  textColorHover="white"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.projectContent}>
          <h1>Project Name :</h1>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
          </p>

          <a className={styles.applyBtn} onClick={openModal}>
            <Button
              text="Apply"
              backgroundColor="#87c0cd"
              borderColor="#87c0cd"
              textColor="#152232"
              backgroundColorHover="#87c0cd"
              borderColorHover="#87c0cd"
              textColorHover="white"
            />
          </a>
        </div>
      </div>
      <Modal
        className={styles.modal}
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className={styles.modalTop}>
          <span>Hello</span>

          <div className={styles.modalInputContainer}>
            <div className={styles.modalInputContainerLeft}></div>
            <div className={styles.modalInputContainerRight}></div>
          </div>
        </div>
        <div className={styles.modalBot}>
          <a>
            <Button
              text="Apply"
              backgroundColor="white"
              borderColor="#152232"
              textColor="#152232"
              backgroundColorHover="#87c0cd"
              borderColorHover="white"
              textColorHover="#152232"
            />
          </a>
          <a>
            <Button
              text="Cancel"
              backgroundColor="#152232"
              borderColor="#152232"
              textColor="white"
              borderColorHover="white"
              textColorHover="white"
            />
          </a>
        </div>
      </Modal>
    </div>
  );
}

export default Join;
