import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import { AppDispatch } from "../store";



export const bookTypes = {
    SET_BOOKS: "SET_BOOKS",
    SET_BOOKS_SUCCESS: "SET__BOOKS_SUCCESS",
    SET_BOOKS_ERROR: "SET_BOOKS_ERROR"
  }


export const getBooks = (token:string | null) =>(

    async (dispatch: AppDispatch) =>{
      const config ={

        headers: { Authorization: `Bearer ${token}` }

}
        dispatch({ type: bookTypes.SET_BOOKS });
        axios
          .get('https://strapi.cleverland.by/api/books', config)
          .then((res) => {
            dispatch({
              type: bookTypes.SET_BOOKS_SUCCESS,
              payload: res.data,

            })

          })
          .catch((err: PayloadAction<SerializedError>) => {

            dispatch({ type: bookTypes.SET_BOOKS_ERROR, payload: err.payload })

        })

        }


)


