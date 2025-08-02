export interface BookEvent {
  bookId: number;
  userId: number;
  username?: string;
  eventId: number;
  eventName?: string;
  eventdt: string;
}