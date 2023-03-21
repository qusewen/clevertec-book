import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import { AppDispatch } from "../store";

export const regTypes = {
    SET_REGISTRATION: 'SET_REGISTRATION',
    SET_REGISTRATION_SUCCESS: 'SET_REGISTRATION_SUCCESS',
    SET_REGISTRATION_ERROR: "SET_REGISTRATION_ERROR"
}


export const postReg = (config:string) => (
    async (dispatch: AppDispatch) => {
        dispatch({ type: regTypes.SET_REGISTRATION });
        const headers =JSON.parse(config)
        axios
            .post('https://strapi.cleverland.by/api/auth/local/register', headers)
            .then((res) => {
                dispatch({
                    type: regTypes.SET_REGISTRATION_SUCCESS,
                    payload: res.data,

                })

            })
            .catch((err: PayloadAction<SerializedError>) => {

                dispatch({ type: regTypes.SET_REGISTRATION_ERROR, payload: err })

            })

    }
)