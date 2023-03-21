import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import { AppDispatch } from "../store";

export const bookingDeleteTypes = {
    SET_DELETE: 'SET_DELETE',
    SET_DELETE_SUCCESS: 'SET_DELETE_SUCCESS',
    SET_DELETE_ERROR: "SET_DELETE_ERROR"
}


export const postBookingDelete = (bookingId:string | null) => (

    async (dispatch: AppDispatch) => {

        dispatch({ type: bookingDeleteTypes.SET_DELETE });
        const aut =`Bearer ${localStorage.getItem('token')}`
        axios

    .delete(`https://strapi.cleverland.by/api/bookings/${bookingId}`,{'headers': {
        'Authorization': aut}
        })
            .then((res) => {
                dispatch({
                    type: bookingDeleteTypes.SET_DELETE_SUCCESS,
                    payload: res.data,

                })

            })
            .catch((error: PayloadAction<SerializedError>) => {

                dispatch({ type: bookingDeleteTypes.SET_DELETE_ERROR, payload: error })

            })

    }
)