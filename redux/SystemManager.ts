import { SUPPORTED_REDUX_FUNCTIONS } from "./SUPPORTED_REDUX_FUNCTION";

const initialState = {
  screenWidth: 0,
};

export interface systemMangerState {
  screenWidth: number
}

const SystemManager = (state = initialState, action: any) => {
  if (action.type === SUPPORTED_REDUX_FUNCTIONS.SET_SCREEN_WIDTH) {
    return {
      ...state,
      screenWidth: action.screenWidth,
    };
  }

  return state;
};

export default SystemManager;
