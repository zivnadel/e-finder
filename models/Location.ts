// custom LatLng (longitude latitude, coords) interface
export interface LatLng {
  lat: number;
  lng: number;
}

// custom Location object structure
export default interface Location {
  lat: number;
  lng: number;
  city: string;
  state: string;
  country: string;
}
