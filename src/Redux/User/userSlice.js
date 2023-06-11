import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../Utils/constants";

export const creatUser = createAsyncThunk(
    "users/creatUser",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/users`, payload);
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const loginUser = createAsyncThunk(
    "users/loginUser",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, payload);
            const login = await axios(`${BASE_URL}/auth/profile`, {
                headers: {
                    "Authorization": `Bearer ${res.data.access_token}`
                }
            });
            return login.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const updateUser = createAsyncThunk(
    "users/updateUser",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);
const addCurrentUser = (state, {payload}) => {
    state.currentUser = payload
}


const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        confirmOrder: [],
        cart: [],
        favorite: [],
        isLoading: false,
        formType: "signup",
        showForm: false,
        lvlUser: 1,
        uxpUser: 0
    },
    reducers: {
        removeItemFromCart: (state, {payload}) => {
            state.cart = state.cart.filter(({id}) => id !== payload)
        },
        removeItemFromFavorite: (state, {payload}) => {
            state.favorite = state.favorite.filter(({id}) => id !== payload)
        },
        clearCard: (state) => {
            state.cart = []
        } ,
        expUpdate: (state, {payload}) => {
            state.uxpUser = state.uxpUser + payload
        },
        resetExpUser: (state) => {
            state.uxpUser = state.uxpUser = 0
        },
        lvlUpdate: (state) => {
            state.lvlUser = state.lvlUser + 1
        },
        addItemToCart: (state, {payload}) => {
            let newCart = [...state.cart]
            const found = state.cart.find(({id}) => id === payload.id)
            if (found) {
                newCart = newCart.map((item) => {
                    return item.id === payload.id ? {...item, quantity: payload.quantity || item.quantity + 1} : item
                })
            } else {
                newCart.push({...payload, quantity: 1})
            }
            state.cart = newCart
        },
        confirmOrderUser: (state, {payload}) => {
            console.log(payload)
            state.confirmOrder = payload
        },
        addItemToFavorite: (state, {payload}) => {
            let newCart = [...state.favorite]
            const found = state.favorite.find(({id}) => id === payload.id)
            if (found) {
                newCart = newCart.map((item) => {
                    return item.id === payload.id ? {...item}: item
                })
            } else {
                newCart.push({...payload})
            }
            state.favorite = newCart
        },
        toggleForm: (state, {payload}) => {
            state.showForm = payload
        },
        toggleFormType: (state, {payload}) => {
            state.formType = payload
        },

    },
    extraReducers: (builder) => {
        builder.addCase(creatUser.fulfilled, addCurrentUser);
        builder.addCase(loginUser.fulfilled, addCurrentUser);
        builder.addCase(updateUser.fulfilled, addCurrentUser);
    }
});

export default userSlice.reducer;

export const {
    addItemToCart,
    toggleForm,
    toggleFormType,
    removeItemFromCart,
    lvlUpdate,
    expUpdate,
    resetExpUser,
    removeItemFromFavorite,
    addItemToFavorite,
    confirmOrderUser,
    clearCard
} = userSlice.actions