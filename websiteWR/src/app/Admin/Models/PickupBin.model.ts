import { Bin } from './Bin.model';

export interface PickupBin {
  bin: Bin;
  image: string;
  time: Date;
  weight: number;
}
