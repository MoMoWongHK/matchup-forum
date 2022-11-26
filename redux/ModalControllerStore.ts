import { Reducer } from "react";
import { SUPPORTED_MODAL_TYPE } from "../utils/ModalType";
import Modal from "../model/Modal";
import { SUPPORTED_REDUX_FUNCTIONS } from "./SUPPORTED_REDUX_FUNCTION";

interface actionTypes {
  type: string;
  Modal: Modal;
  typeOfModal: SUPPORTED_MODAL_TYPE;
  returnFn: () => void | null;
  metaData: null;
  uploadPath?: string;
  limit?: number;
}

export interface modalInitStateType {
  Modal: Modal;
  returnFn: (() => void) | null;
  metaData: null;
  uploadPath?: string;
  limit?: number;
}

const initialState: modalInitStateType = {
  Modal: new Modal("", false),
  returnFn: null,
  metaData: null,
  uploadPath: "",
  limit: 1,
};

const ModalControllerStore: Reducer<modalInitStateType, actionTypes> = (
  state = initialState,
  action
) => {
  if (action.type === SUPPORTED_REDUX_FUNCTIONS.TOGGLE_MODAL) {
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    if (action.typeOfModal === SUPPORTED_MODAL_TYPE.UPLOAD_FILE_MODAL) {
      return {
        ...state,
        Modal: new Modal(action.typeOfModal, true),
        returnFn: action.returnFn,
        metaData: action.metaData,
        uploadPath: action.uploadPath,
        limit: action.limit,
      };
    } else if (
      action.typeOfModal === SUPPORTED_MODAL_TYPE.TEST_MODAL ||
      action.typeOfModal === SUPPORTED_MODAL_TYPE.ADD_POST_MODAL
    ) {
      return {
        ...state,
        Modal: new Modal(action.typeOfModal, true),
        returnFn: action.returnFn,
        metaData: action.metaData,
      };
    }
  } else if (action.type === SUPPORTED_REDUX_FUNCTIONS.CLOSE_MODAL) {
    document.getElementsByTagName("body")[0].style.overflowY = "scroll";
    return {
      ...state,
      Modal: new Modal("", false),
    };
  }

  return state;
};

export default ModalControllerStore;
