import React from 'react';
import styles from "../../Style/Sidebar.module.css"
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const SideBar = (props) => {

    const {list} = useSelector(({categories}) => categories);


    return (
        <section className={styles.sidebar}>
            <div className={styles.title}>
                CATEGORIES
            </div>
            <nav>
                <ul className={styles.menu}>
                    {list.map(({id, name}) => (
                        <li key={id}>
                            <NavLink
                                className={({isActive}) => `${styles.link} ${isActive ? styles.active : undefined}`}
                                to={`/categories/${id}`}>
                                {name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={styles.footer}>
                <a href="/help" target={"_blank"} className={styles.link}>
                    Help
                </a>

            </div>
        </section>
    );
}

export default SideBar;