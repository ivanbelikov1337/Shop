import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from "../../Style/Cart.module.css"
import {AiOutlineMinus} from 'react-icons/ai';
import {AiOutlinePlus} from 'react-icons/ai';
import {GrClose} from 'react-icons/gr';
import {sumBy} from "../../Utils/common";
import {addItemToCart, removeItemFromCart} from "../../Redux/User/userSlice";
import {Link} from "react-router-dom";
import {ROUTES} from "../../Utils/routes";


const Basket = (props) => {
    const {cart} = useSelector(({user}) => user)
    const dispatch  = useDispatch()
    const changeQuantity = (item, quantity) => {
        dispatch(addItemToCart({...item, quantity}))
    }
    const removeItem = (id) => {

        dispatch(removeItemFromCart(id))
    }

    return (
        <section className={styles.cart}>
            <h2>Your cart</h2>

            {!cart.length ? (<div className={styles.empty}>Here is empty</div>) :
                (<>
                    <div className={styles.list}>
                        {cart.map((item) => {
                            const {title, category, price, images, id, quantity} = item
                            return (
                                <div key={id} className={styles.item}>
                                    <div className={styles.image} style={{backgroundImage: `url(${images[0]})`}}/>
                                    <div className={styles.info}>
                                        <div className={styles.name}>{title}</div>
                                        <div className={styles.category}>{category.name}</div>
                                    </div>
                                    <div className={styles.price}>{price}$</div>
                                    <div className={styles.quantity}>
                                        <div className={styles.minus}
                                             onClick={()=> changeQuantity(item, Math.max(1, quantity - 1))}>
                                            <AiOutlineMinus/>
                                        </div>
                                        <span>{quantity}</span>
                                        <div className={styles.plus}
                                             onClick={()=> changeQuantity(item, Math.max(1, quantity + 1))}>
                                            <AiOutlinePlus/>
                                        </div>
                                    </div>
                                    <div className={styles.total}>{price * quantity}$</div>
                                    <div className={styles.close} onClick={() => removeItem(item.id)}>
                                        <GrClose/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.actions}>
                        <div className={styles.total}>
                            TOTAL PRICE: {""}
                            <span>{sumBy(cart.map(({quantity, price }) => quantity * price ))}$</span>
                        </div>
                        <Link className={styles.proceed} to={ROUTES.ORDER}>Proceed to checkout</Link>
                    </div>
                </>)
            }
        </section>
    );
}

export default Basket;