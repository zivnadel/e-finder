import EventModel from "./EventModel";

// a type representing the response containing the eventss
// as it is returned from the API

export default interface EventsResponseModel {
  count: number;
  overflow: boolean;
  previous: string | null;
  next: string | null;
  results: EventModel[];
  error?: string;
  status?: number;
}
