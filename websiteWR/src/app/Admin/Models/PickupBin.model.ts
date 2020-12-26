import { Bin } from './Bin.model';

export interface PickupBin {
  bin: Bin;
  image_taken: string;
  datetime: Date;
  weight_recorded: number;
}
