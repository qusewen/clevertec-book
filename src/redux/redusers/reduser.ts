import { burgerState } from '../actions/action';

const initialState = {
  burgerSet: false,
};


export const reduserBurgerState = (state = initialState, action: any  ) => {

  switch (action.type) {
    case burgerState.SET_BURGER:
      return {
        ...state,
        burger: action.payload,
      };
    case 'openBurger':
      return { ...state, burgerSet: true };
    case 'closeBurger':
      return { ...state, burgerSet: false };
    default:
      return state;
  }
};
