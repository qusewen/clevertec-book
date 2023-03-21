import { PayloadAction } from '@reduxjs/toolkit';
import { revTypes } from "../actions/rev";


const initialState = {
    rev: [],
    loading: false,
    error: false,
    success: false,
    bodyError: []
};

export const reduserRev = (state = initialState, action: PayloadAction) => {
    switch (action.type) {
        case revTypes.SET_REV:
            return {
                ...state,
                rev: [],
                loading: true,
                success: false,
                error: false,
                bodyError: []

            };
        case revTypes.SET_REV_SUCCESS:
            return {
                ...state,
                rev: action.payload,
                loading: false,
                success: true,
                error: false,
                bodyError: []

            };
        case revTypes.SET_REV_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                bodyError: action.payload

            };
        default:
            return state;
    }
}