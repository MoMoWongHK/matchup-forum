import { DateObj, GENDER, INDUSTRY, LANGUAGE, LOCATION } from "./SystemType";

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
