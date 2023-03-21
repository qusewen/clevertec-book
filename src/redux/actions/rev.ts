import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import { AppDispatch } from "../store";

export const revTypes = {
    SET_REV: 'SET_REV',
    SET_REV_SUCCESS: 'SET_REV_SUCCESS',
    SET_REV_ERROR: "SET_REV_SUCCESS"
}


export const postRev = (config:string) => (

    async (dispatch: AppDispatch) => {

        dispatch({ type: revTypes.SET_REV });
        const aut =`Bearer ${localStorage.getItem('token')}`
        const headers =JSON.parse(config)
        axios

    .post('https://strapi.cleverland.by/api/comments', {"data": headers},{'headers': {
        'Authorization': aut}
        })
            .then((res) => {
                dispatch({
                    type: revTypes.SET_REV_SUCCESS,
                    payload: res.data,

                })

            })
            .catch((error: PayloadAction<SerializedError>) => {

                dispatch({ type: revTypes.SET_REV_SUCCESS, payload: error })

            })

    }
)