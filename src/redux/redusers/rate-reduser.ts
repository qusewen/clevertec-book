import { burgerState } from '../actions/action';

const initialState = {
  rate: '0',
};


export const reduserRateState = (state = initialState, action: any  ) => {

  switch (action.type) {
    case burgerState.SET_BURGER:
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
