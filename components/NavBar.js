import styles from "../styles/NavBar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { useEffect, useState } from "react";

function NavBar() {
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  console.log(router.asPath);

  useEffect(() => {
    fetch(`http://localhost:3000/users/userData/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        setAvatar(data.user.photo);
        console.log("data:", data);
      });
  }, []);

  let navBar;

  const deconnection = () => {
    dispatch(logout());
  };

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
  } else if (router.asPath === "/lobby") {
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
            <div onClick={deconnection}>
              <Button
                text="Log out"
                backgroundColor="white"
                borderColor="#152232"
                textColor="#152232"
                backgroundColorHover="#87c0cd"
                borderColorHover="#87c0cd"
                textColorHover="white"
              />
            </div>
          </Link>
          <Link href="/profile">
            <img className={styles.photoPreview} src={avatar} alt="photo" />
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
            <div>
              <Button
                text="Sign In"
                backgroundColor="white"
                borderColor="#152232"
                textColor="#152232"
                backgroundColorHover="#87c0cd"
                borderColorHover="#87c0cd"
                textColorHover="white"
              />
            </div>
          </Link>
          <Link href="/signIn">
            <div onClick={deconnection}>
              <Button
                text="Log out"
                backgroundColor="white"
                borderColor="#152232"
                textColor="#152232"
                backgroundColorHover="#87c0cd"
                borderColorHover="#87c0cd"
                textColorHover="white"
              />
            </div>
          </Link>
          <Link href="/profile">
            <img className={styles.photoPreview} src={avatar} alt="photo" />
          </Link>
        </div>
      </div>
    );
  } else if (router.asPath === "/dashboard") {
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
            <div>
              <Button
                text="Sign In"
                backgroundColor="white"
                borderColor="#152232"
                textColor="#152232"
                backgroundColorHover="#87c0cd"
                borderColorHover="#87c0cd"
                textColorHover="white"
              />
            </div>
          </Link>
          <Link href="/signIn">
            <div onClick={deconnection}>
              <Button
                text="Log out"
                backgroundColor="white"
                borderColor="#152232"
                textColor="#152232"
                backgroundColorHover="#87c0cd"
                borderColorHover="#87c0cd"
                textColorHover="white"
              />
            </div>
          </Link>
          <Link href="/profile">
            <img className={styles.photoPreview} src={avatar} alt="photo" />
          </Link>
        </div>
      </div>
    );
  } else if (router.asPath === "/createProject") {
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
            <div>
              <Button
                text="Sign In"
                backgroundColor="white"
                borderColor="#152232"
                textColor="#152232"
                backgroundColorHover="#87c0cd"
                borderColorHover="#87c0cd"
                textColorHover="white"
              />
            </div>
          </Link>
          <Link href="/signIn">
            <div onClick={deconnection}>
              <Button
                text="Log out"
                backgroundColor="white"
                borderColor="#152232"
                textColor="#152232"
                backgroundColorHover="#87c0cd"
                borderColorHover="#87c0cd"
                textColorHover="white"
              />
            </div>
          </Link>
          <Link href="/profile">
            <img className={styles.photoPreview} src={avatar} alt="photo" />
          </Link>
        </div>
      </div>
    );
  } else if (router.asPath === "/profile") {
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
            <div>
              <Button
                text="Sign In"
                backgroundColor="white"
                borderColor="#152232"
                textColor="#152232"
                backgroundColorHover="#87c0cd"
                borderColorHover="#87c0cd"
                textColorHover="white"
              />
            </div>
          </Link>
          <Link href="/signIn">
            <div onClick={deconnection}>
              <Button
                text="Log out"
                backgroundColor="white"
                borderColor="#152232"
                textColor="#152232"
                backgroundColorHover="#87c0cd"
                borderColorHover="#87c0cd"
                textColorHover="white"
              />
            </div>
          </Link>
        </div>
      </div>
    );
  }
  return <>{navBar}</>;
}

export default NavBar;
