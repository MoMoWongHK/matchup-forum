export const memberInit: Member = {
  GCMToken: [],
  bookmark: [],
  createDate: new Date(),
  isConfirmEmail: false,
};

export interface Member {
  GCMToken: string[];
  bookmark: string[];
  createDate: Date;
  isConfirmEmail: boolean;
}

export interface updateEmailState {
  isConfirmEmail: boolean;
}

export interface updateGCMToken {
  GCMToken: any;
}
