import { PayloadAction } from '@reduxjs/toolkit';
import { categoriesType } from "../actions/categories-action";


const initialState = {
categories: [],
loading: false,
error: false,
success: false,
};

export const reduserCategories =(state = initialState,  action: PayloadAction) => {

    switch (action.type) {
        case categoriesType.SET_CATEGORIES:
          return {
            ...state,
            categories: [],
            loading: true,
            success: false,
            error: false,
          };
        case categoriesType.SET_CATEGORIES_SUCCESS:
          return {
            ...state,
            categories: action.payload,
            loading: false,
            success: true,
            error: false
          };
        case categoriesType.SET_CATEGORIES_ERROR:
          return {
            ...state,
            loading:false,
            error: true,
          };
        default:
          return state;
      }
}