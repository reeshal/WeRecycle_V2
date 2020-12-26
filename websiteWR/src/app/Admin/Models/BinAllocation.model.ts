export interface BinAllocation {
  id: number;
  date: string;
  driver_name: string;
  photo_taken: string;
  weight: number;
  bin: {
    bin_id: number;
    lng: number;
    lat: number;
    imageUrl: string;
    date_reported: string;
  };
}
