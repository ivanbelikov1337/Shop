import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../Style/Profile.module.css";
import {updateUser} from "../../Redux/User/userSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const { currentUser , lvlUser} = useSelector(({ user }) => user);

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        avatar: "",
    });

    useEffect(() => {
        if (!currentUser) return;

        setValues(currentUser);
    }, [currentUser]);

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isNotEmpty = Object.values(values).every((val) => val);

        if (!isNotEmpty) return;

        dispatch(updateUser(values));
    };

    return (
        <section className={styles.profile}>
            {!currentUser ? (
                <span>You need to log in</span>
            ) : (
                <div className={styles.wrapper}>
                    <span className={styles.lvlUser}>{lvlUser}</span>
                    <div className={styles.avatar} style={{backgroundImage: `url(${values.avatar})`}}/>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.group}>
                            <input
                                type="email"
                                placeholder="Your email"
                                name="email"
                                value={values.email}
                                autoComplete="off"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.group}>
                            <input
                                type="name"
                                placeholder="Your name"
                                name="name"
                                value={values.name}
                                autoComplete="off"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.group}>
                            <input
                                type="password"
                                placeholder="Your password"
                                name="password"
                                value={values.password}
                                autoComplete="off"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.group}>
                            <input
                                type="avatar"
                                placeholder="Your avatar"
                                name="avatar"
                                value={values.avatar}
                                autoComplete="off"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.submit}>
                            Update
                        </button>
                    </form>
                </div>
            )}
        </section>
    );
};

export default Profile;
