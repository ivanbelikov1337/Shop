import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useGetProductQuery} from "../../Redux/Api/apiSlice";
import {ROUTES} from "../../Utils/routes";
import Product from "./Product";
import Products from "./Products";
import {useDispatch, useSelector} from "react-redux";
import {getRelativeProducts} from "../../Redux/Products/productsSlice";


const SingleProducts = (props) => {
    const {id} = useParams()
    const {data, isLoading, isFetching, isSuccess} = useGetProductQuery({id})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {list, related} = useSelector(({products}) => products)

    useEffect(() => {
        if (!isFetching && !isLoading && !isSuccess) {
            navigate(ROUTES.HOME)
        }
    }, [isLoading, isFetching, isSuccess]);

    useEffect(() => {
        if (!data || !list.length) return

        dispatch(getRelativeProducts(data.category.id))

    }, [dispatch, data, list.length])

    return !data ?
        (
            <section>Loading...</section>
        ) :
        (
            <>
                <Product {...data}/>
                <Products products={related} amount={5} title={"Related products"}/>
            </>
        )
}

export default SingleProducts;