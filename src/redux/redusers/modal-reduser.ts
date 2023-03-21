import { modalState } from '../actions/action';
import {Page} from '../../types/types'

const initialState = {
  modalSet: false,
};
interface Act{

    payload:Page,
    type:string

}

export const reduserModalState = (state = initialState, action: Act  ) => {

  switch (action.type) {
    case modalState.SET_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case 'openModal':
      return { ...state, modalSet: true };
    case 'closeModal':
      return { ...state, modalSet: false };
    default:
      return state;
  }
};
