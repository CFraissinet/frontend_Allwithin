import styles from '../styles/Home.module.css';

function Home() {
  return (
    <div className={styles.homeContainer}>
    <div className={styles.backgroundTop}>
        <div className={styles.navbar}>
            <div className={styles.logoContainer}>
                <img className={styles.logo} src="/path/to/your/logo.png" alt="Logo" />
            </div>
            <div className={styles.buttons}>
                <button className={styles.button}>Sign Up</button>
                <button className={styles.button}>Sign In</button>
            </div>
        </div>
        <h1 className={styles.title}>
            Welcome to <span className={styles.highlight}>AllWithin</span>
        </h1>
        <h2 className={styles.subtitle}>Where projects come to life</h2>
    </div>
    <div className={styles.backgroundBottom}></div>
</div>
);
}

export default Home;
