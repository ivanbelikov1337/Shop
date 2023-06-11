import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../Utils/constants";
import {buildUrl} from "../../Utils/common";


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ["Product"],
    endpoints: (build) => ({
        getProduct: build.query({
            query: ({id}) => `/products/${id}`,
            providesTags: ["Product"]
        }),
        getProducts: build.query({
            query: (params) => buildUrl("/products", params),
            providesTags: ["Products"]
        })
    })
})

export const {useGetProductQuery, useGetProductsQuery} = apiSlice