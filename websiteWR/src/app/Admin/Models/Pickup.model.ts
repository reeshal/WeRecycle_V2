export interface Pickup {
  id: number;
  date: Date;
  driverId: number;
  pickups: {
    id: number;
    beforeImage: string;
    afterImage: string;
    weight: number;
  }[];
}
