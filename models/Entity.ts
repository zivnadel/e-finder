export default interface Entity {
  id: string;
  name: string;
  type: "airport" | "venue" | "event-group";
  formatted_address: string;
}
