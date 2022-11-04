import CategoryModel from "./CategoryModel";

export default interface EventModel {
  relevance: number;
  id: string;
  title: string;
  description: string;
  category: CategoryModel;
  labels: string[];
  rank: number;
  local_rank: number;
  phq_attendance: number;
  entities: any[];
  duration: number;
  start: string;
  end: string;
  updated: string;
  first_seen: string;
  timezone: string;
  location: [number, number];
  geo: {
    geometry: {
      coordinates: [number, number];
      type: string;
    };
    placekey: string;
  };
  scope: string;
  country: string;
  place_hierarchies: string[][];
  state: string;
  brand_safe: boolean;
  private: boolean;
}
