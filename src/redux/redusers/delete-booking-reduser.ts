import { PayloadAction } from '@reduxjs/toolkit';
import { bookingDeleteTypes } from "../actions/delete-booking";


const initialState = {
    bookingDelete: [],
    loadingDel: false,
    errorDel: false,
    sucDel: false,
    bodyError: []
};

export const reduserBookingDelete = (state = initialState, action: PayloadAction) => {
    switch (action.type) {
        case bookingDeleteTypes.SET_DELETE:
            return {
                ...state,
                bookingDelete: [],
                loadingDel: true,
                sucDel: false,
                errorDel: false,
                bodyError: []

            };
        case bookingDeleteTypes.SET_DELETE_SUCCESS:
            return {
                ...state,
                bookingDelete: action.payload,
                loadingDel: false,
                sucDel: true,
                errorDel: false,
                bodyError: []

            };
        case bookingDeleteTypes.SET_DELETE_ERROR:
            return {
                ...state,
                loadingDel: false,
                sucDel: false,
                errorDel: true,
                bodyError: action.payload

            };
        default:
            return state;
    }
}