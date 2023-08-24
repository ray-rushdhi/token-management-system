import { Gender } from "./gender.enum";

export interface Patient{
    id?: number;
    firstName?: string;
    lastName?: string;
    gender?: Gender;
    dob?: Date;
    contactNum?: number;
    username?: string;
    email?: string;
    password?: string;
    roles?: Array<string>;
}

export class PatientUpdateRequest implements Patient {
    constructor(
        public id?: number,
      public firstName?: string,
      public lastName?: string,
      public gender?: Gender,
      public dob?: Date,
      public contactNum?: number,
      public email?: string,
      public username?: string
    ) {}
  }