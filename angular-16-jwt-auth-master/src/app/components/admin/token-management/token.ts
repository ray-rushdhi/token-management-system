import { TokenState } from "./tokenState.enum";

export interface Token{
    id?: string;
    tokenNum?: number;
    selectedDay?: string;
    state?: TokenState;
    reservedByID?: number;
    reservedByName?: string;
}

export class TokenImplementation implements Token {
    constructor(
      public tokenNum?: number,
      public selectedDay?: string,
      public reservedByID?: number
    ) {}
  }