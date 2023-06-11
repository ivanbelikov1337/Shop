import React from 'react';
import styles from "../../Style/Footer.module.css"
import {Link} from "react-router-dom";
import {ROUTES} from "../../Utils/routes";
import { AiFillInstagram } from 'react-icons/ai';
import { AiFillGithub } from 'react-icons/ai';
const Footer = (props) => {
    return (
        <section className={styles.footer}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>

                </Link>
            </div>
            <div className={styles.rights}>
                Developer by Belikov
            </div>
            <div className={styles.socials}>
                <a href="https://instagram.com/vania_belikov_?igshid=MjEwN2IyYWYwYw==">
                    <AiFillInstagram/>
                </a>
                <a href="https://github.com/ivanbelikov1337">
                    <AiFillGithub/>
                </a>
            </div>
        </section>
    );
}

export default Footer;