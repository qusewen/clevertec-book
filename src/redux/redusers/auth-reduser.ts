import { PayloadAction } from '@reduxjs/toolkit';
import { authTypes } from "../actions/auth";


const initialState = {
user: [],
loading: false,
error: false,
success: false,
bodyError:[]
};

export const reduserAuth =(state = initialState,  action: PayloadAction) => {
    switch (action.type) {
        case authTypes.SET_LOGIN:
          return {
            ...state,
            user: [],
            loading: true,
            success: false,
            error: false,
bodyError:[]

          };
        case authTypes.SET_LOGIN_SUCCESS:
          return {
            ...state,
            user: action.payload,
            loading: false,
            success: true,
            error: false,
bodyError:[]

          };
        case authTypes.SET_LOGIN_ERROR:
          return {
            ...state,
            loading:false,
            error: true,
bodyError:action.payload

          };
        default:
          return state;
      }
}