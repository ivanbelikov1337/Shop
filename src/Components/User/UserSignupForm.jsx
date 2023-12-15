import React, {useState} from 'react';
import styles from "../../Style/User.module.css"
import {AiFillCloseCircle} from 'react-icons/ai';
import {useDispatch} from "react-redux";
import {creatUser} from "../../Redux/User/userSlice";

const UserSignupForm = ({toggleCurrentFormType,closeForm}) => {
    const dispatch = useDispatch()
    const [values, setValue] = useState({
        name: "",
        email: "",
        password: "",
        avatar: ""
    })


    const handleChangeInput = ({target: {value, name}}) => {
        setValue({...values, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isEmpty = Object.values(values).some((val) => !val)
        if (isEmpty) return
        dispatch(creatUser(values))
        closeForm()
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.close} onClick={closeForm}>
                <AiFillCloseCircle/>
            </div>
            <div className={styles.title}>
                Sing up
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <input type="email" name="email"
                           placeholder={"Yor email"}
                           autoComplete={"off"}
                           onChange={handleChangeInput}
                           required
                           value={values.email}
                    />
                </div>
                <div className={styles.group}>
                    <input type="name" name="name"
                           placeholder={"Yor name"}
                           autoComplete={"off"}
                           onChange={handleChangeInput}
                           required
                           value={values.name}
                    />
                </div>
                <div className={styles.group}>
                    <input type="password" name="password"
                           placeholder={"Yor password"}
                           autoComplete={"off"}
                           onChange={handleChangeInput}
                           required
                           value={values.password}
                    />
                </div>
                <div className={styles.group}>
                    <input type="avatar" name="avatar"
                           placeholder={"Yor avatar"}
                           autoComplete={"off"}
                           onChange={handleChangeInput}
                           required
                           value={values.avatar}
                    />
                </div>
                <div className={styles.link} onClick={() => toggleCurrentFormType("login")}>I already have an account</div>
                <button className={styles.submit} type="submit">
                    Creat an account
                </button>
            </form>
        </div>
    );
}

export default UserSignupForm;

