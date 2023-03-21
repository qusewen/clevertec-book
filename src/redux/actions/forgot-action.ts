import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import { AppDispatch } from "../store";

export const forgotTypes = {
    SET_FORGOT: 'SET_FORGOT',
    SET_FORGOT_SUCCESS: 'SET_FORGOT_SUCCESS',
    SET_FORGOT_ERROR: "SET_FORGOT_ERROR"
}


export const postForgot = (config:string) => (
    async (dispatch: AppDispatch) => {
        dispatch({ type: forgotTypes.SET_FORGOT });
        const headers =JSON.parse(config)
        axios
            .post('https://strapi.cleverland.by/api/auth/forgot-password', headers)
            .then((res) => {
                dispatch({
                    type: forgotTypes.SET_FORGOT_SUCCESS,
                    payload: res.data,

                })

            })
            .catch((err: PayloadAction<SerializedError>) => {

                dispatch({ type: forgotTypes.SET_FORGOT_ERROR, payload: err })

            })

    }
)