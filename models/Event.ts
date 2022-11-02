export default interface Event {
  id: string;
  name: string;
  description: string;
  date: Date;
  location: string;
  image: string;
  popularity: number;
  topics: string[];
  isFree: boolean;
  price: number;
  isOnline: boolean;
}
