import { PayloadAction } from '@reduxjs/toolkit';
import { forgotTypes } from "../actions/forgot-action";


const initialState = {
status: [],
loading: false,
error: false,
success: false,
};

export const reduserForgot =(state = initialState,  action: PayloadAction) => {
    switch (action.type) {
        case forgotTypes.SET_FORGOT:
          return {
            ...state,
            status: [],
            loading: true,
            success: false,
            error: false,
          };
        case forgotTypes.SET_FORGOT_SUCCESS:
          return {
            ...state,
            status: action.payload,
            loading: false,
            success: true,
            error: false
          };
        case forgotTypes.SET_FORGOT_ERROR:
          return {
            ...state,
            loading:false,
            error: true,
          };
        default:
          return state;
      }
}