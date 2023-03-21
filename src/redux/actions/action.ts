import axios from "axios";
import { AppDispatch } from "../store";

export const burgerState = {
  SET_BURGER: 'SET_BURGER',

};
export const acardionState = {
  SET_ACARDION: 'SET_ACARDION'
}
export const categoriesState = {
SET_CATEGOR: 'SET_CATEGOR'
}

export const modalState = {
SET_MODAL:'SET_MODAL'
}

export const rateState = {
  SET_RATE:'SET_RATE'
  }
  export const bookingsState = {
    SET_BOOKS:'SET_BOOKS'
    }



export const getBurgerState = () => (
  async (dispatch: AppDispatch) => {
    dispatch({ type: burgerState.SET_BURGER })
    dispatch({ type: acardionState.SET_ACARDION })
    dispatch({ type: categoriesState.SET_CATEGOR })
    dispatch({ type: modalState.SET_MODAL })
    dispatch({ type: rateState.SET_RATE })
    dispatch({ type: bookingsState.SET_BOOKS })
  }
)
