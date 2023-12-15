import React from 'react';
import styles from "../../../Style/Poseter.module.css"
import BG from '../../../Images/computer.png'

const Poster = () => {
    return (
        <section className={styles.home}>
            <div className={styles.title}>
                 SALE 30%
            </div>
            <div className={styles.product}>
                <div className={styles.text}>
                    <div className={styles.subtitle}>
                        Best product of 2023
                    </div>
                    <h1 className={styles.head}>Falcon Northwest Tiki NVIDIA 5090 TI</h1>
                </div>
                <div className={styles.image }>
                    <img src={BG} className={styles.posterImg} alt="computer"/>
                </div>
            </div>
        </section>
    );
}

export default Poster;