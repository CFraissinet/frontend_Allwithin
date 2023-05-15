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
            <button className={styles.button}>Sign Up</button>
            <button className={styles.button}>Sign In</button>
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
            <div className={styles.leftCard}></div>
        <div className={styles.rightCard}></div>
            </div>
            </div>
        {/* backgroundTop end*/}

      {/* container for the cards */}
      

   
      {/* background bottom */}
      {/* <div className={styles.backgroundBottom}></div> */}
    </div>
  );
}

export default Home;
