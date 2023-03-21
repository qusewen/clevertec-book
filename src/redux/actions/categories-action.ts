import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import { AppDispatch } from "../store";



export const categoriesType = {
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_CATEGORIES_SUCCESS: "SET__CATEGORIES_SUCCESS",
  SET_CATEGORIES_ERROR: "SET_CATEGORIES_ERROR"
}


export const getCategories = (token: any) => (

  async (dispatch: AppDispatch) => {
    const config ={

      headers: { Authorization: `Bearer ${token}` }

}
    dispatch({ type: categoriesType.SET_CATEGORIES });
    axios
      .get('https://strapi.cleverland.by/api/categories', config)
      .then((res) => {
        dispatch({
          type: categoriesType.SET_CATEGORIES_SUCCESS,
          payload: res.data,

        })

      })
      .catch((err: PayloadAction<SerializedError>) => {

        dispatch({ type: categoriesType.SET_CATEGORIES_ERROR, payload: err.payload })
      })

  }


)
