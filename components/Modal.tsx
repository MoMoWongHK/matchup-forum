import React, { ReactChild, useEffect, useRef, useState } from "react";
import { i18n } from "i18next";
import { Trans } from "react-i18next";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { SUPPORTED_REDUX_FUNCTIONS } from "../redux/SUPPORTED_REDUX_FUNCTION";

interface ModalButton {
  text: string;
  color: "primary" | "secondary" | "error" | "success" | "info";
  onClick: (params?: any) => void;
  size: "32" | "64" | "full";
}

interface Modal {
  isOpen: boolean;
  buttons: ModalButton[];
  title: string;
  modalSize: "md" | "2xl" | "3xl" | "4xl" | "7xl";
  returnFn?: any;
  auth?: any;
  ref?: any;
  children: ReactChild;
  component: any;
  metaData: any;
  noCancelButton?: boolean;
  haveLoading?: boolean;
}

const CustomModal: React.FC<Modal> = ({
  isOpen,
  title,
  modalSize,
  buttons,
  component: Component,
  metaData,
  returnFn,
  noCancelButton,
  haveLoading,
}) => {
  const refButton = useRef<any>(null);
  const dispatch = useDispatch();
  const screenWidth = useSelector((state: any) => {
    return state.SystemManager.screenWidth;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [swiped, setSwiped] = useState<boolean>(false);

  const minSwipeDistance = window.innerHeight / 2 - 100;

  const closeModalFunc = () => {
    dispatch({
      type: SUPPORTED_REDUX_FUNCTIONS.CLOSE_MODAL,
    });
  };

  const onTouchStart = (e: any) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };
  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientY);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isDownSwipe = distance < -minSwipeDistance;
    if (isDownSwipe) {
      setSwiped(true);
      onCycle();
      setTimeout(closeModalFunc, 200);
    }
  };

  const [isVisible, onCycle] = useCycle(true, false);

  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      {/*// @ts-ignore*/}
      <AnimatePresence>
        {isVisible && (
          <div className="modal modal-open">
            <motion.div
              key="modal"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1, y: window.innerHeight }}
              drag={screenWidth < 768 ? "y" : false}
              dragDirectionLock={true}
              dragMomentum={false}
              dragConstraints={{ top: 0, bottom: swiped ? 100 : 0 }}
              dragElastic={{ top: 0, bottom: 1 }}
              className={classNames(
                "w-full h-3/4 md:h-auto",
                `md:max-w-${modalSize}`
              )}
            >
              <div
                onTouchStart={screenWidth < 768 ? onTouchStart : undefined}
                onTouchMove={screenWidth < 768 ? onTouchMove : undefined}
                onTouchEnd={screenWidth < 768 ? onTouchEnd : undefined}
                id={"modal-box"}
                className={classNames(
                  "modal-box relative w-full overflow-hidden h-full animated animatedFadeInUp fadeInUp mx-auto",
                  `md:max-w-${modalSize}`
                )}
              >
                <div
                  className={"md:invisible visible  h-2 rounded-xl mb-4 w-full"}
                >
                  <div
                    id={"swipeDownButton"}
                    className="md:invisible visible bg-gray-300 w-12 absolute top-2 h-2 rounded-xl mb-4"
                    style={{ left: "45%" }}
                  ></div>
                </div>

                <motion.label whileHover={{ scale: 1.2 }}>
                  <label
                    onClick={() => closeModalFunc()}
                    htmlFor="my-modal-3"
                    className="md:visible invisible btn btn-sm btn-circle absolute right-2 top-2"
                  >
                    ✕
                  </label>
                </motion.label>

                {/*Header*/}
                <div className="w-full h-auto justify-center items-center">
                  {title ? (
                    <div className="font-bold text-2xl  mb-6 text-gray-800 md:text-left text-center pb-2">
                      <Trans>{title}</Trans>
                    </div>
                  ) : null}
                </div>
                {/*Header End*/}

                {/*Body Starts*/}
                <div
                  className="container overflow-y-auto"
                  style={{
                    minHeight: "150px",
                    marginBottom: "calc(env(safe-area-inset-bottom) + 40px)",
                    maxHeight: screenWidth < 720 ? "420px" : "600px",
                  }}
                >
                  <Component
                    closeModal={closeModalFunc}
                    metaData={metaData}
                    ref={refButton}
                    returnFn={returnFn}
                    isOpen={isOpen}
                  />
                </div>
                {/* Body Ends*/}

                {/*Bottom Button Starts*/}
                <div className="absolute safe-are-detection-bottom-absolute right-3 w-full bg-white md:px-8 px-0 pb-2">
                  {buttons.map((button, index) => {
                    return (
                      <button
                        key={"btn" + index}
                        onClick={() => {
                          if (haveLoading) {
                            setIsLoading(true);
                          }
                          if (refButton.current) {
                            button.onClick(refButton.current.returnData());
                          } else {
                            button.onClick();
                          }
                        }}
                        className={classNames(
                          "btn float-right rounded-md",
                          `w-${button.size}`,
                          `w-${button.size}`,
                          {
                            "btn-primary": button.color === "primary",
                            "btn-secondary": button.color === "secondary",
                            "btn-success": button.color === "success",
                            "btn-error": button.color === "error",
                            "btn-info": button.color === "info",
                            //eslint-disable-next-line
                            loading: isLoading,
                          }
                        )}
                      >
                        <Trans>{button.text}</Trans>
                      </button>
                    );
                  })}

                  <button
                    className={
                      noCancelButton
                        ? "invisible"
                        : "w-16 md:w-28 h-12 rounded-md mx-4 md:mx-4 float-right md:visible invisible"
                    }
                    onClick={() => {
                      closeModalFunc();
                    }}
                  >
                    <Trans>Modal.cancel</Trans>
                  </button>
                </div>
                {/*Bottom Button Ends*/}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomModal;
