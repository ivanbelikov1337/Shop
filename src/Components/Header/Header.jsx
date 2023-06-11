import React, {useEffect, useState} from 'react';
import styles from "../../Style/Header.module.css"
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "../../Utils/routes";
import avatar from '../../Images/avatarUnknown.png'
import {AiOutlineHeart} from 'react-icons/ai';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {AiOutlineSearch} from 'react-icons/ai';
import {useDispatch, useSelector} from "react-redux";
import {lvlUpdate, resetExpUser, toggleForm} from "../../Redux/User/userSlice";
import {useGetProductsQuery} from "../../Redux/Api/apiSlice";

const Header = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {currentUser, cart, uxpUser, } = useSelector(({user}) => user)
    const [searchValue, setSearchValue] = useState("")
    const [values, setValue] = useState({name: "Guest", avatar: avatar})
    let [swicher, setSwicher] = useState(false)
    const handleClick = () => {
        if (!currentUser) dispatch(toggleForm(true))
        else navigate(ROUTES.PROFILE)
    }
    const {data, isLoading} = useGetProductsQuery({title: searchValue})
    useEffect(() => {
        if (!currentUser) return
        setValue(currentUser)
    }, [currentUser])

    useEffect(() => {
        if (!currentUser) return
        if (uxpUser >= 100) {
            dispatch(resetExpUser())
            dispatch(lvlUpdate())
        }
    }, [uxpUser,currentUser,dispatch])
    const handleSearch = ({target: {value}}) => {
        setSearchValue(value)

    }
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    Shop
                </Link>
            </div>
            <div className={styles.info}>
                <div className={styles.user}>
                    <form className={styles.form}>
                        <div className={styles.icon}><AiOutlineSearch/></div>
                        <div className={styles.input}>
                            <input type="search"
                                   name={"search"}
                                   placeholder={"Search for anything..."}
                                   autoComplete="off"
                                   onChange={handleSearch}
                                   value={searchValue}
                                   onClick={() => setSwicher(!swicher)}

                            />
                        </div>
                        {swicher && (<div className={styles.box}>
                            {isLoading ? "Loading" : !data.length ? "No results" : (
                                data.map(({title, images, id}) => {
                                    return (
                                        <Link className={styles.item}
                                              key={id}
                                              to={`/products/${id}`}
                                              onClick={() => {
                                                  setSearchValue("")
                                                  setSwicher(false)
                                              }}
                                        >
                                            <div className={styles.image}
                                                 style={{backgroundImage: `url(${images[0]})`}}/>
                                            <div>{title}
                                            </div>
                                        </Link>
                                    )
                                })
                            )
                            }
                        </div>)}
                    </form>
                    <div className={styles.account}>
                        <Link to={ROUTES.FAVORITE} className={styles.favourites}>
                            <AiOutlineHeart size={100}/>
                            <span className={styles.fav}></span>
                        </Link>
                        <Link to={ROUTES.BASKET} className={styles.cart}>
                            <AiOutlineShoppingCart size={100}/>
                            <span className={styles.count}>{cart.length}</span>
                        </Link>
                    </div>
                    <div className={styles.userItems} onClick={handleClick}>
                        <div className={styles.avatar} style={{backgroundImage: `url(${values.avatar})`}}/>
                        <div className={styles.username}>
                            {values.name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default Header;