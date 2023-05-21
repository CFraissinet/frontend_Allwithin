import styles from "../styles/NavBar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../components/Button";

function NavBar() {
  const router = useRouter();
  console.log(router.asPath);

  let navBar;

  if (router.asPath === "/") {
    navBar = (
      <div className={styles.headerContainer}>
        {/* LOGO */}
        <div className={styles.button}>
          <img src="logo.png" alt="Logo" className={styles.logo} />
        </div>

        <div className={styles.buttonContainer}>
          {/* BUTTON */}
          <Link href="/signIn">
            <a>
              <Button
                text="Sign In"
                backgroundColor="white"
                borderColor="#152232"
                textColor="#152232"
                backgroundColorHover="#87c0cd"
                borderColorHover="#87c0cd"
                textColorHover="white"
              />
            </a>
          </Link>

          <Link href="/signUp">
            <a>
              <Button
                text="Sign Up"
                backgroundColor="#152232"
                borderColor="#152232"
                textColor="white"
                backgroundColorHover="#87c0cd"
                borderColorHover="#87c0cd"
                textColorHover="white"
              />
            </a>
          </Link>
        </div>
      </div>
    );
  } else if (router.asPath === "/signIn") {
    navBar = (
      <div className={styles.headerContainer}>
        {/* LOGO */}
        <div className={styles.button}>
          <Link href="/">
            <a>
              <img src="logo.png" alt="Logo" className={styles.logo} />
            </a>
          </Link>
        </div>

        <div className={styles.buttonContainer}>
          {/* BUTTON */}
          <Link href="/signUp">
            <a>
              <Button
                text="Sign Up"
                backgroundColor="#152232"
                borderColor="#152232"
                textColor="white"
                backgroundColorHover="#87c0cd"
                borderColorHover="#87c0cd"
                textColorHover="white"
              />
            </a>
          </Link>
        </div>
      </div>
    );
  } else if (router.asPath === "/signUp") {
    navBar = (
      <div className={styles.headerContainer}>
        {/* LOGO */}
        <div className={styles.button}>
          <Link href="/">
            <a>
              <img src="logo.png" alt="Logo" className={styles.logo} />
            </a>
          </Link>
        </div>

        <div className={styles.buttonContainer}>
          {/* BUTTON */}
          <Link href="/signIn">
            <a>
              <Button
                text="Sign In"
                backgroundColor="white"
                borderColor="#152232"
                textColor="#152232"
                backgroundColorHover="#87c0cd"
                borderColorHover="#87c0cd"
                textColorHover="white"
              />
            </a>
          </Link>
        </div>
      </div>
    );
  } else if (router.asPath === "/join") {
    navBar = (
      <div className={styles.headerContainer}>
        {/* LOGO */}
        <div className={styles.button}>
          <Link href="/">
            <a>
              <img src="logo.png" alt="Logo" className={styles.logo} />
            </a>
          </Link>
        </div>

        <div className={styles.buttonContainer}>
          {/* BUTTON */}
          <Link href="/signIn">
            <a>
              <Button
                text="Sign In"
                backgroundColor="white"
                borderColor="#152232"
                textColor="#152232"
                backgroundColorHover="#87c0cd"
                borderColorHover="#87c0cd"
                textColorHover="white"
              />
            </a>
          </Link>
        </div>
      </div>
    );
  }
  return <>{navBar}</>;
}

export default NavBar;
