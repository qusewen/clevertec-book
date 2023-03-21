import { PayloadAction } from '@reduxjs/toolkit';
import { bookingTypes } from "../actions/booking-action";


const initialState = {
    booking: [],
    loading: false,
    err: false,
    suc: false,
    bodyError: []
};

export const reduserBooking = (state = initialState, action: PayloadAction) => {
    switch (action.type) {
        case bookingTypes.SET_BOOKING:
            return {
                ...state,
                booking: [],
                loading: true,
                suc: false,
                err: false,
                bodyError: []

            };
        case bookingTypes.SET_BOOKING_SUCCESS:
            return {
                ...state,
                booking: action.payload,
                loading: false,
                suc: true,
                err: false,
                bodyError: []

            };
        case bookingTypes.SET_BOOKING_ERROR:
            return {
                ...state,
                loading: false,
                err: true,
                bodyError: action.payload

            };
        default:
            return state;
    }
}