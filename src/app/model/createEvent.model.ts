import { IEvent } from "./event.model";
import { User } from "./user.model";

export interface IBookEvent {
  bookId: number;
  userId: number;
  eventId: number;
  eventdt: string;
  user: User;
  event: IEvent;
}