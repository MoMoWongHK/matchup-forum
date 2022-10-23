import { DateObj, GENDER, INDUSTRY, LANGUAGE, LOCATION } from "./SystemType";

export interface User {
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
}
