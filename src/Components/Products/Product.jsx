import React, {useEffect, useState} from 'react';
import styles from "../../Style/Product.module.css"
import {Link} from "react-router-dom";
import {ROUTES} from "../../Utils/routes";
import {useDispatch} from "react-redux";
import {addItemToCart, addItemToFavorite, expUpdate} from "../../Redux/User/userSlice";

const Product = (item) => {
    const {images, title, price, description} = item
    const SIZES = [4, 4.5, 5]
    const [currentImage, setCurrentImage] = useState()
    const [currentSize, setCurrentSize] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!images.length) return;
        setCurrentImage(images[0])
    }, [images])


    const addToCard = (status) => {
        switch (status) {
            case "card":
                return [dispatch(addItemToCart(item)), dispatch(expUpdate(20))]
            case "favorite":
                return [dispatch(addItemToFavorite(item)), dispatch(expUpdate(10))]
            default:
                return status
        }

    }
    return (
        <section className={styles.product}>
            <div className={styles.images}>
                <div className={styles.current}
                     style={{backgroundImage: `url(${currentImage})`}}
                />
                <div className={styles["images-list"]}>
                    {images.map((image, i) => (
                        <div className={styles.image}
                             key={i}
                             style={{backgroundImage: `url(${image})`}}
                             onClick={() => setCurrentImage(image)}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.info}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.price}>{price}$</div>
                <div className={styles.color}><span>Color:</span> Red</div>
                <div className={styles.size}>
                    <span>Sizes:</span>
                    <div className={styles.list}>
                        {SIZES.map(size => (
                            <div onClick={() => setCurrentSize(size)}
                                 className={`${styles.sizeB} ${currentSize === size ? styles.actions: ""}`} key={size}>
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <p className={styles.description}>{description}</p>
                <div className={styles.button}>
                    <button onClick={() => addToCard("card")} className={styles.add} disabled={!currentSize}>Add to card</button>
                    <button onClick={() => addToCard("favorite")} className={styles.favourite}>Add to favourite</button>
                </div>
                <div className={styles.bottom}>
                    <Link to={ROUTES.HOME}>Return to home</Link>
                </div>
            </div>
        </section>
    );
}

export default Product;