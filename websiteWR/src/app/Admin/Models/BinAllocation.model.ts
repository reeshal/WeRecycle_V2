import { Driver } from './Driver.model';
import { PickupBin } from './PickupBin.model';

export interface BinAllocation {
  pickup_id: number;
  pickup_date: string;
  pickup_status: string;
  driver: Driver;
  pickupBins: PickupBin[];
}
