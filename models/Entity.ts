// a schema for the entity (represents location of venue) inside the event
export default interface Entity {
  id: string;
  name: string;
  type: "airport" | "venue" | "event-group";
  formatted_address: string;
}
