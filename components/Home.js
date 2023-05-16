import styles from '../styles/Home.module.css';

function Home() {
  return (
    <div className={styles.homeContainer}>

      {/* background top */}
      {/* navbar start*/}
        <div className={styles.navbar}>
          <div className={styles.logoContainer}>
            <img className={styles.logo} src="/path/to/your/logo.png" alt="Logo" />
          </div>
          <div className={styles.buttons}>
            <button className={styles.btnSIgnIn}>Sign In</button>
            <button className={styles.btnSignUp}>Sign Up</button>
          </div>
      </div>
           {/* navbar end*/}

           {/* backgroundTop start*/}
      <div className={styles.backgroundTop}>
          <h1 className={styles.title}>
            Welcome to <span className={styles.highlight}>AllWithin</span>
          </h1>
          <h2 className={styles.subtitle}>Where projects come to life</h2>
            <div className={styles.lineContainer}>
              <div className={styles.square}></div>
              <div className={styles.line}></div>
            </div>
            <div className={styles.containerCards}>
            <div className={styles.leftCard}>
            <button className={styles.btnLeft}>Creat Project</button>
            </div>
        <div className={styles.rightCard}>
            <button className={styles.btnRight}>Join Project</button>
        </div>
            </div>
            </div>
        {/* backgroundTop end*/}
    </div>
  );
}

export default Home;
