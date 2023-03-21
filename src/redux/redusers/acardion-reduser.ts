import { PayloadAction } from '@reduxjs/toolkit';
import { acardionState } from '../actions/action';

const initialState = {
    acardionSet: false,
};


interface ActionA{
  type:'openAcardion'
  openAcardion: boolean
}

interface ActionB{
  type:'closeAcardion'
  closeAcardion: boolean
}
interface ActionC{
  type:'SET_ACARDION'
  SET_ACARDION:boolean
}
type ActionTypes = ActionA | ActionB | ActionC
export const reduserAcardionState = (state = initialState, action: PayloadAction<ActionTypes>) => {

  switch (action.type) {
    case acardionState.SET_ACARDION:
      return {
        ...state,
        acardion: action.payload,
      };
    case 'openAcardion':
      return { ...state, acardionSet: true };
    case 'closeAcardion':
      return { ...state, acardionSet: false };
    default:
      return state;
  }
};
