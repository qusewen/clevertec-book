import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import { AppDispatch } from "../store";

export const bookingTypes = {
    SET_BOOKING: 'SET_BOOKING',
    SET_BOOKING_SUCCESS: 'SET_BOOKING_SUCCESS',
    SET_BOOKING_ERROR: "SET_BOOKING_ERROR"
}


export const postBooking = (config:string) => (

    async (dispatch: AppDispatch) => {

        dispatch({ type: bookingTypes.SET_BOOKING });
        const aut =`Bearer ${localStorage.getItem('token')}`
        const headers =JSON.parse(config)
        axios

    .post('https://strapi.cleverland.by/api/bookings', {"data": headers},{'headers': {
        'Authorization': aut}
        })
            .then((res) => {
                dispatch({
                    type: bookingTypes.SET_BOOKING_SUCCESS,
                    payload: res.data,

                })

            })
            .catch((error: PayloadAction<SerializedError>) => {

                dispatch({ type: bookingTypes.SET_BOOKING_ERROR, payload: error })

            })

    }
)