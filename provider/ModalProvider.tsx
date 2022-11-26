import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SUPPORTED_MODAL_TYPE } from "../utils/ModalType";
import AddPostComponent from "../components/Modals/AddPostComponent";
import { ApplicationState } from "../redux/store";
import CustomModal from "../components/Modal";
import { addPost } from "../helperFunction/postDBHelper";
import { SUPPORTED_REDUX_FUNCTIONS } from "../redux/SUPPORTED_REDUX_FUNCTION";
import { Post } from "../model/Post";

export const ModalProvider: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: ApplicationState) => state.modal.Modal.isOpen
  );

  const modalName = useSelector(
    (state: ApplicationState) => state.modal.Modal.name
  );

  const closeModalFunc = () => {
    dispatch({
      type: SUPPORTED_REDUX_FUNCTIONS.CLOSE_MODAL,
    });
  };

  if (isOpen && modalName === SUPPORTED_MODAL_TYPE.ADD_POST_MODAL) {
    const createPost = async (post: Post) => {
      const state = await addPost(post);
      if (state.success) {
        closeModalFunc();
      }
    };

    return (
      <CustomModal
        isOpen={isOpen}
        buttons={[
          {
            text: "NewPostModal.send",
            color: "primary",
            size: "32",
            onClick: createPost,
          },
        ]}
        title={"NewPostModal.title"}
        modalSize={"7xl"}
        component={AddPostComponent}
        metaData={props.metaData}
        haveLoading={true}
      />
    );
  }

  return <div />;
};
