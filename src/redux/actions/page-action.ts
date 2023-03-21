import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";
import { AppDispatch } from "../store";




export const pageType = {
    SET_PAGE: "SET_PAGE",
    SET_PAGE_SUCCESS: "SET_PAGE_SUCCESS",
    SET_PAGE_ERROR: "SET_PAGE_ERROR"
  }


export const getPage = (id:number, token:string | null) =>(

    async (dispatch: AppDispatch) =>{
      const config ={

        headers: { Authorization: `Bearer ${token}` }

  }
        dispatch({ type: pageType.SET_PAGE });
        axios
          .get(`https://strapi.cleverland.by/api/books/${id}`, config)
          .then((res) => {
            dispatch({
              type: pageType.SET_PAGE_SUCCESS,
              payload: res.data,

            })

          })
              .catch((err: PayloadAction<SerializedError>) => {
                dispatch({ type: pageType.SET_PAGE_ERROR, payload: err.payload })
              })
        }


)
