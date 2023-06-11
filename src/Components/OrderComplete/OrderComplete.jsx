import React, {useEffect, useState} from 'react';
import styles from "../../Style/OrderComplete.module.css"
import {useDispatch, useSelector} from "react-redux";
import {clearCard, confirmOrderUser} from "../../Redux/User/userSlice";
import { BsFillBagCheckFill } from 'react-icons/bs';


const OrderComplete = () => {
    const dispatch = useDispatch();
    const { currentUser,cart,confirmOrder } = useSelector(({ user }) => user);
    const [switcher, setSwitcher] = useState(false)
    const [values, setValues] = useState({
        name: "",
        email: "",
        phone: ""
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
        dispatch(confirmOrderUser(values));
        dispatch(clearCard())
        setSwitcher(true)
        setTimeout(() => {
            setSwitcher(false)
        }, 3500);
    };
    console.log(confirmOrder)
    return (
        <section className={styles.cart}>
              <h2 className={styles.title}>Order comfier</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <input
                        type="email"
                        placeholder="Your email"
                        name="email"
                        value={values.email || ""}
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
                        value={values.name || ""}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.group}>
                    <input
                        type="number"
                        placeholder="Your phone number"
                        name="phone"
                        value={values.phone || ""}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className={styles.submit}>
                    Confirm
                </button>
            </form>
            {switcher ? <div className={styles.successfully}>
                <BsFillBagCheckFill size={40}/>
                <p>The order successfully</p>
            </div> : null}
        </section>
    );
}


export default OrderComplete;