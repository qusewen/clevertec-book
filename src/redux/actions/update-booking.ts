import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import { AppDispatch } from "../store";

export const bookingUpdateTypes = {
    SET_UPDATE: 'SET_UPDATE',
    SET_UPDATE_SUCCESS: 'SET_UPDATE_SUCCESS',
    SET_UPDATE_ERROR: "SET_UPDATE_ERROR"
}


export const postBookingUpdate = (bookingId:string | null, config:string) => (

    async (dispatch: AppDispatch) => {

        dispatch({ type: bookingUpdateTypes.SET_UPDATE });
        const aut =`Bearer ${localStorage.getItem('token')}`
        const headers =JSON.parse(config)
        axios

    .put(`https://strapi.cleverland.by/api/bookings/${bookingId}`,{"data": headers},{'headers': {
        'Authorization': aut}
        })
            .then((res) => {
                dispatch({
                    type: bookingUpdateTypes.SET_UPDATE_SUCCESS,
                    payload: res.data,

                })

            })
            .catch((error: PayloadAction<SerializedError>) => {

                dispatch({ type: bookingUpdateTypes.SET_UPDATE_ERROR, payload: error })

            })

    }
)