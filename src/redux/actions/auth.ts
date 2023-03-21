import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import { AppDispatch } from "../store";

export const authTypes = {
    SET_LOGIN: 'SET_LOGIN',
    SET_LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    SET_LOGIN_ERROR: "SET_LOGIN_ERROR"
}


export const postAuth = (config:string) => (

    async (dispatch: AppDispatch) => {

        dispatch({ type: authTypes.SET_LOGIN });
        const headers =JSON.parse(config)
        axios
            .post('https://strapi.cleverland.by/api/auth/local', headers)
            .then((res) => {
                dispatch({
                    type: authTypes.SET_LOGIN_SUCCESS,
                    payload: res.data,

                })

            })
            .catch((error: PayloadAction<SerializedError>) => {

                dispatch({ type: authTypes.SET_LOGIN_ERROR, payload: error })

            })

    }
)