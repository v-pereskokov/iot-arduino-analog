import { SET_INPUT_DATA, SET_LOADING, SET_USER } from './common.constants';

const initialState = {
  inputData: {
    value: '',
  },
  loaderData: {
    isActive: false,
  },
  userData: {
    name: '',
  },
};

export function common(state = initialState, action) {
  switch (action.type) {
    case SET_INPUT_DATA:
      return {
        ...state,
        inputData: {...action.inputData},
      };
    case SET_LOADING:
      return {
        ...state,
        loaderData: {...action.loaderData},
      };
    case SET_USER:
      return {
        ...state,
        userData: {...action.userData},
      };
    default:
      return state;
  }
}
