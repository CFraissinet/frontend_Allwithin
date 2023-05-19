import styles from "../styles/NavBar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

function NavBar() {
  const router = useRouter();
  console.log(router);
  return (
    <div className={styles.headerContainer}>
      {/* LOGO */}
      <div className={styles.button}>
        <Link href="/">
          <img src="logo.png" alt="Logo" className={styles.logo} />
        </Link>
      </div>
      {/* BUTTON */}
      <Link href="/signIn">
        <button className={styles.signInbutton}>Sign in</button>
      </Link>
    </div>
  );
}

export default NavBar;
