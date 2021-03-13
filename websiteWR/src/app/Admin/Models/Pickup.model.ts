export interface Pickup {
  date: Date;
  driverId: number;
  pickups: {
    id: number;
    beforeImage: string;
    afterImage: string;
    weight: number;
  }[];
}
