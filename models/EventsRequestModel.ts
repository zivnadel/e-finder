import EventModel from "./EventModel";

export default interface EventsRequestModel {
  count: number;
  overflow: boolean;
  previous: string | null;
  next: string | null;
  results: EventModel[];
}
