import { SET_INPUT_DATA, SET_LOADING, SET_USER } from './common.constants';
import { IInputData, ILoaderData, IUser } from 'yourTypes';

export interface ICommonReducer {
  inputData: IInputData;
  loaderData: ILoaderData;
  userData: IUser;
}

enum CommonActionTypes {
  SET_INPUT_DATA = 'SET_INPUT_DATA',
  SET_LOADING = 'SET_LOADING',
  SET_USER = 'SET_USER',
}

interface ICommonAction {
  type: CommonActionTypes;
  inputData?: IInputData;
  loaderData?: ILoaderData;
  userData?: IUser;
}

const initialState: ICommonReducer = {
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

export function common(state: ICommonReducer = initialState, action: ICommonAction) {
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
