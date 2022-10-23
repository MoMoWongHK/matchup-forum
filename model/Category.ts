export interface Category {
  titleHK: string;
  titleEN: string;
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
