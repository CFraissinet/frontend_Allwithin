import React, { useState } from 'react';
import styles from '../styles/Dashboard.module.css';
import Link from 'next/link';

function Dashboard() {

    const [btnProject, setBtnProject] = useState(false);

    const toolsBtn = (
    <>
        <button className={styles.btnModal}> Chat</button>
        <button className={styles.btnModal}>Drive</button>
        <button className={styles.btnModal}>Github</button>
        <button className={styles.btnModal}>Calendar</button>
        <button className={styles.btnModal}>My team</button>
    </>
    )

    return (
        <div className={styles.main}>
            <div className={styles.navBar}>
                {/* NAV BAR */}
                <div className={styles.btnContainer}>
                    <Link href='/lobby'>
                        <button className={styles.btnNavBar} >My lobby</button>
                    </Link>
                    <button className={styles.btnNavBar} >My message</button>
                </div>
            </div>
            <div className={styles.componant}>
                {/* COMPONANT WITH BUTTON LEFT AND DASHBOARD */}
                    <div className={styles.containerBtn}>
                        {btnProject && toolsBtn}
                    </div>
                <div className={styles.containerDashboard}>
                    <div className={styles.dashboard}>
                            <h2 className={styles.txtCard1}>Project Name <b className={styles.aDashboard}>DASHBOARD</b></h2>
                        <div className={styles.midContainer}>
                            <div className={styles.midCard}>
                                <div className={styles.containerPost}>
                                    <b className={styles.postPending}>Post Pending :</b>
                                    <div className={styles.post}> POST 1</div>
                                    <div className={styles.post}> POST 2</div>
                                    <div className={styles.post}> POST 3</div>
                                    <div className={styles.post}> POST 4</div>
                                    <div className={styles.post}> POST 5</div>
                                </div>
                            </div>
                            <div className={styles.midCard}>
                                <div className={styles.txtDescription}>
                                    <b>Description :</b>
                                </div>
                            </div>
                        </div>
                        <div className={styles.containerStartBtn}>
                            <button onClick={() => setBtnProject(true)} className={styles.btnStart}>Start project</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;