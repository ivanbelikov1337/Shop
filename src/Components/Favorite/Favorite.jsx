import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { removeItemFromFavorite} from "../../Redux/User/userSlice";
import styles from "../../Style/Cart.module.css"
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {GrClose} from "react-icons/gr";
import {sumBy} from "../../Utils/common";
import {Link} from "react-router-dom";
const Favorite = () => {
    const {favorite} = useSelector(({user}) => user)
    const dispatch  = useDispatch()
    const removeItem = (id) => {
        dispatch(removeItemFromFavorite(id))
    }
    console.log(favorite)
    return (
        <section className={styles.cart}>
            <h2>Your Favorite</h2>
            {!favorite.length ? (<div className={styles.empty}>Here is empty</div>) :
                (<>
                    <div className={styles.list}>
                        {favorite.map((item) => {
                            const {title, category, price, images, id, } = item
                            return (
                                <Link to={`/products/${id}`} key={id} className={styles.item}>
                                    <div className={styles.image} style={{backgroundImage: `url(${images[0]})`}}/>
                                    <div className={styles.info}>
                                        <div className={styles.name}>{title}</div>
                                        <div className={styles.category}>{category.name}</div>
                                    </div>
                                    <div className={styles.price}>{price}$</div>
                                    <div className={styles.close} onClick={() => removeItem(item.id)}>
                                        <GrClose/>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </>)
            }
        </section>
    );
}

export default Favorite;