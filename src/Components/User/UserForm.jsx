import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import UserSignupForm from "./UserSignupForm";
import styles from "../../Style/User.module.css"
import {toggleForm, toggleFormType} from "../../Redux/User/userSlice";
import UserLogin from "./UserLogin";

const UserForm = () => {
    const {showForm, formType} = useSelector(({user}) => user)
    const dispatch = useDispatch()
    const closeForm = () => dispatch(toggleForm(false))
    const toggleCurrentFormType = (type) => dispatch(toggleFormType(type))

    return (
        showForm ?
            (<>
                <div className={styles.overlay} onClick={closeForm}/>
                {formType === "signup" ?
                    <UserSignupForm toggleCurrentFormType={toggleCurrentFormType} closeForm={closeForm}/> :
                    <UserLogin toggleCurrentFormType={toggleCurrentFormType} closeForm={closeForm}/>}
            </>) : <></>

    );
}

export default UserForm;
