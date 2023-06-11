import React, {useEffect} from 'react';
import AppRoutes from "../Routes/Routes";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";
import {useDispatch} from "react-redux";
import {getCategories} from "../../Redux/Categories/categoriesSlice";
import {getProducts} from "../../Redux/Products/productsSlice";
import UserForm from "../User/UserForm";

const App = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <div className={"app"}>
            <Header/>
            <UserForm/>
            <div className="container">
                <SideBar/>
                <AppRoutes/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;