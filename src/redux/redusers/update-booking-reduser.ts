import { PayloadAction } from '@reduxjs/toolkit';
import { bookingUpdateTypes } from "../actions/update-booking";


const initialState = {
    bookingUpdate: [],
    loadingPut: false,
    errorPut: false,
    sucPut: false,
    bodyError: []
};

export const reduserBookingUpdate = (state = initialState, action: PayloadAction) => {
    switch (action.type) {
        case bookingUpdateTypes.SET_UPDATE:
            return {
                ...state,
                bookingUpdate: [],
                loadingPut: true,
                sucPut: false,
                errorPut: false,
                bodyError: []

            };
        case bookingUpdateTypes.SET_UPDATE_SUCCESS:
            return {
                ...state,
                bookingUpdate: action.payload,
                loadingPut: false,
                sucPut: true,
                errorPut: false,
                bodyError: []

            };
        case bookingUpdateTypes.SET_UPDATE_ERROR:
            return {
                ...state,
                loadingPut: false,
                errorPut: true,
                bodyError: action.payload

            };
        default:
            return state;
    }
}