import { bookingsState } from '../actions/action';

const initialState = {
  date: '',
};


export const reduserBooks = (state = initialState, action: any  ) => {

  switch (action.type) {
    case bookingsState.SET_BOOKS:
      return {
        ...state,
        rate: action.payload,
      };
    case 'addState':
      return { ...state, rate: action.payload };
    default:
      return state;
  }
};
