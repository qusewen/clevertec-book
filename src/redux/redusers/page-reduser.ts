import { PayloadAction } from '@reduxjs/toolkit';
import { pageType } from "../actions/page-action";


const initialState = {
page: [],
loading: false,
error: false,
success: false,
};

export const reduserPage =(state = initialState,  action: PayloadAction) => {

    switch (action.type) {
        case pageType.SET_PAGE:
          return {
            ...state,
            page: [],
            loading: true,
            success: false,
            error: false,
          };
        case pageType.SET_PAGE_SUCCESS:
          return {
            ...state,
            page: action.payload,
            loading: false,
            success: true,
            error: false
          };
        case pageType.SET_PAGE_ERROR:
          return {
            ...state,
            loading:false,
            error: true,
          };
        default:
          return state;
      }
}