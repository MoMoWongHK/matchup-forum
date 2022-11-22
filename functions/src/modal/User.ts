import {
  DateObj,
  GENDER,
  INDUSTRY,
  LANGUAGE,
  LOCATION,
} from "../../../model/SystemType";

export const userInit: User = {
  avatarUrl: "",
  bookmark: [],
  GCMToken: [],
  id: "",
  uid: "",
  email: "",
  userName: "",
  createDate: new Date(),
  lang: LANGUAGE.HK,
  firstName: "",
  lastName: "",
  gender: GENDER.U,
  industry: INDUSTRY.DEFAULT,
  location: LOCATION.DEFAULT,
  lastSignIn: new Date(),
  subscribed: [],
  isConfirmEmail: false,
};

export interface User {
  avatarUrl: string;
  bookmark: string[];
  GCMToken: string[];
  id: string;
  uid: string;
  email: string;
  userName: string;
  createDate: Date | DateObj;
  lang: LANGUAGE;
  firstName: string;
  lastName: string;
  gender: GENDER;
  industry: INDUSTRY;
  location: LOCATION;
  lastSignIn: Date | DateObj;
  subscribed: string[];
  isConfirmEmail: boolean;
}

export interface updateEmailState {
  isConfirmEmail: boolean;
}

export interface updateGCMToken {
  GCMToken: any;
}

export interface updateSubscribed {
  subscribed: any;
}
