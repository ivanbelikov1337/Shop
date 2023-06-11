import React, {useEffect} from 'react';
import Poster from "./Poster/Poster";
import Products from "../Products/Products";
import {useDispatch, useSelector} from "react-redux";
import Categories from "../Categories/Categories";
import Banner from "../Banner/Baner";
import {filterByPrice} from "../../Redux/Products/productsSlice";

const Home = (props) => {
    const {products: {list, filtered}, categories} = useSelector((state) => state)
    const dispatch = useDispatch()

    useEffect(() => {
      if(!list.length) return;
        dispatch(filterByPrice(100))
    }, [dispatch, list.length]);


    return (
        <>
            <Poster/>
            <Products products={list} amount={5} title={"Popular"}/>
            <Categories products={categories.list} amount={5} title={"Worth seeing"}/>
            <Banner/>
            <Products products={filtered} amount={5} title={"Less than 100$"}/>
        </>
    );
}

export default Home;