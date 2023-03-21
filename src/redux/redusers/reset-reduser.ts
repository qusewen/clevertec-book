import { PayloadAction } from '@reduxjs/toolkit';
import { resetTypes } from "../actions/reset-action";


const initialState = {
status: [],
loading: false,
error: false,
success: false,
};

export const reduserReset =(state = initialState,  action: PayloadAction) => {
    switch (action.type) {
        case resetTypes.SET_RESET:
          return {
            ...state,
            status: [],
            loading: true,
            success: false,
            error: false,
          };
        case resetTypes.SET_RESET_SUCCESS:
          return {
            ...state,
            status: action.payload,
            loading: false,
            success: true,
            error: false
          };
        case resetTypes.SET_RESET_ERROR:
          return {
            ...state,
            loading:false,
            error: true,
          };
        default:
          return state;
      }
}