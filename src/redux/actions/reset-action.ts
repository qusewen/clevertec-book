import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import { AppDispatch } from "../store";

export const resetTypes = {
    SET_RESET: 'SET_RESET',
    SET_RESET_SUCCESS: 'SET_RESET_SUCCESS',
    SET_RESET_ERROR: "SET_RESET_ERROR"
}


export const postReset = (config:string) => (
    async (dispatch: AppDispatch) => {
        dispatch({ type: resetTypes.SET_RESET });
        const headers =JSON.parse(config)
        axios
            .post('https://strapi.cleverland.by/api/auth/reset-password', headers)
            .then((res) => {
                dispatch({
                    type: resetTypes.SET_RESET_SUCCESS,
                    payload: res.data,

                })

            })
            .catch((err: PayloadAction<SerializedError>) => {

                dispatch({ type: resetTypes.SET_RESET_ERROR, payload: err })

            })

    }
)