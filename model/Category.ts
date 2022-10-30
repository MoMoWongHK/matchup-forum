export interface Category {
  avatarURL: string;
  titleHK: string;
  titleEN: string;
  descriptionHK: string;
  descriptionEN: string;
  numOfPost: number;
  status: CATEGORY_STATUS;
  numOfFollowing: number;
  adminUserID: string[];
}

enum CATEGORY_STATUS {
  PENDING,
  ONLINE,
  SEARCHABLE,
  CLOSE,
}

export const defaultCategory = {
  avatarURL: "",
  titleHK: "",
  titleEN: "",
  descriptionHK: "",
  descriptionEN: "",
  numOfPost: 0,
  status: CATEGORY_STATUS.ONLINE,
  numOfFollowing: 0,
  adminUserID: [],
};
