import { PayloadAction } from '@reduxjs/toolkit';
import { regTypes } from "../actions/registration"


const initialState = {
user: [],
loading: false,
error: false,
success: false,
bodyError:[]
};

export const reduserRegistration =(state = initialState,  action: PayloadAction) => {
    switch (action.type) {
        case regTypes.SET_REGISTRATION:
          return {
            ...state,
            user: [],
            loading: true,
            success: false,
            error: false,
            bodyError:[]
          };
        case regTypes.SET_REGISTRATION_SUCCESS:
          return {
            ...state,
            user: action.payload,
            loading: false,
            success: true,
            error: false,
            bodyError:[]
          };
        case regTypes.SET_REGISTRATION_ERROR:
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