import React, {useState} from 'react';
import styles from "../../Style/User.module.css"
import {AiFillCloseCircle} from 'react-icons/ai';
import {useDispatch} from "react-redux";
import { loginUser} from "../../Redux/User/userSlice";

const UserSignupForm = ({toggleCurrentFormType,closeForm}) => {
    const dispatch = useDispatch()
    const [values, setValue] = useState({
        email: "",
        password: "",
    })

    const handleChangeInput = ({target: {value, name}}) => {
        setValue({...values, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isEmpty = Object.values(values).some((val) => !val)
        if (isEmpty) return
        dispatch(loginUser(values))
        closeForm()
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.close} onClick={closeForm}>
                <AiFillCloseCircle/>
            </div>
            <div className={styles.title}>Log in</div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <input type="email" name="new-email"
                           placeholder={"Yor email"}
                           autoComplete={"off"}
                           onChange={handleChangeInput}
                           required
                           value={values.email}
                    />
                </div>
                <div className={styles.group}>
                    <input type="password" name="new-password"
                           placeholder={"Yor password"}
                           autoComplete={"off"}
                           onChange={handleChangeInput}
                           required
                           value={values.password}
                    />
                </div>
                <div className={styles.link} onClick={() => toggleCurrentFormType("signup")}>Creat an account</div>
                <button className={styles.submit} type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default UserSignupForm;

