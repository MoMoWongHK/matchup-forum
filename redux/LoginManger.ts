import { SUPPORTED_REDUX_FUNCTIONS } from "./SUPPORTED_REDUX_FUNCTION";
import { Reducer } from "react";
import { ROLE } from "../Enum/APP_TYPE";

interface actionTypes {
  type: string;
  data: AUTH;
}

export interface AUTH {
  uid: string;
  photoURL: string | null;
  displayName: string | null;
  email: string | null;
  token?: string | null;
  role: ROLE | "";
  expirationTime: Date | null;
  custID?: string | null;
}

export interface modalInitStateType {
  auth: AUTH | null;
}

const initialState: modalInitStateType = {
  auth: null,
};

const LoginManager: Reducer<modalInitStateType, actionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SUPPORTED_REDUX_FUNCTIONS.LOGIN:
      return {
        ...state,
        auth: action.data,
      };
    case SUPPORTED_REDUX_FUNCTIONS.LOGOUT:
      return {
        ...state,
        auth: {
          uid: "",
          photoURL: "",
          displayName: "",
          email: "",
          token: "",
          role: "",
          expirationTime: null,
          custID: "",
        },
      };
    default:
      return state;
  }
};

export default LoginManager;
