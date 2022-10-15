import { MODAL_TYPE } from "../Enum/MODAL_TYPE";

class Modal {
  name: MODAL_TYPE | string;

  isOpen: boolean;

  constructor(name: MODAL_TYPE | string, isOpen: boolean) {
    this.name = name;
    this.isOpen = isOpen;
  }
}

export default Modal;
