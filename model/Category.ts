export interface Category {
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
  titleHK: "香港城市大學",
  titleEN: "City University of Hong Kong",
  descriptionHK:
    "作為全球領先的大學，城大秉承新理念，並不斷尋求新方法來改善世界。 城大在QS排名中目前在全球大學中排名第48位。",
  descriptionEN: "",
  numOfPost: 0,
  status: CATEGORY_STATUS.ONLINE,
  numOfFollowing: 0,
  adminUserID: [],
};
