import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "../Home/Home";
import {ROUTES} from "../../Utils/routes";
import SingleProducts from "../Products/SingleProducts";
import Profile from "../Profile/Profile";
import SingleCategory from "../Categories/SingleCategory";
import Basket from "../Basket/Basket";
import Favorite from "../Favorite/Favorite";
import OrderComplete from "../OrderComplete/OrderComplete";


const AppRoutes = (props) => {
    return (
        <Routes>
            <Route index element={<Home/>}/>
            <Route path={ROUTES.PRODUCT} element={<SingleProducts/>}/>
            <Route path={ROUTES.PROFILE} element={<Profile/>}/>
            <Route path={ROUTES.CATEGORY} element={<SingleCategory/>}/>
            <Route path={ROUTES.BASKET} element={<Basket/>}/>
            <Route path={ROUTES.FAVORITE} element={<Favorite/>}/>
            <Route path={ROUTES.ORDER} element={<OrderComplete/>}/>
        </Routes>
    );
}

export default AppRoutes;