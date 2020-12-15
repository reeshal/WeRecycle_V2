import { Bins } from './bins';

export interface Reg_Users {
  phoneno: string;
  email: string;
  fullname: string;
  address: string;
  status: string;
  type: string;
  brn: string;
  bins: Bins[];
}
