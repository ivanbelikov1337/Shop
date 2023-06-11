import React from 'react';
import styles from "../../Style/Home.module.css"
import bannerImg from "../../Images/banner.png"
import {Link} from "react-router-dom";
import {ROUTES} from "../../Utils/routes";

const Banner = (props) => {
    return (
        <section className={styles.banner}>
            <div className={styles.left}>
                <p className={styles.content}>
                    <span>SALE</span>
                </p>
                <Link to={ROUTES.PRODUCT} className={styles.more}>See more</Link>
            </div>
            <div className={styles.right} style={{backgroundImage: `url(${bannerImg})`}}>
                <p className={styles.discount}>
                    save up to <span>30%</span> off
                </p>
            </div>
        </section>
    );
}

export default Banner;