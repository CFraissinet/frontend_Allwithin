import styles from "../styles/Join.module.css";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { useState } from "react";

function Join() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.searchBox}>
          <div className={styles.searchContent}>
            <input
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.input}
              placeholder="What are you looking for ?"
            ></input>
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
          </div>
          <div className={styles.locationContent}>
            <input
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.input}
              placeholder="Where ?"
            ></input>
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

        <div className={styles.filterContent}></div>

        <div className={styles.projectContainer}>
          <div className={styles.projectCard}></div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.projectContent}>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
          </p>

          <a>
            <Button
              backgroundColor="#87c0cd"
              borderColor="#87c0cd"
              textColor="#152232"
              backgroundColorHover="#87c0cd"
              borderColorHover="#87c0cd"
              textColorHover="#152232"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Join;
