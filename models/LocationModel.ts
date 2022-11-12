// custom LatLng (longitude latitude, coords) interface
export interface LatLng {
  lat: number;
  lng: number;
}

// custom Location object structure
export default interface LocationModel {
  q?: string;
  lat: number;
  lng: number;
  city: string;
  country: string;
}
