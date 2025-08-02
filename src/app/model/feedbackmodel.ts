export interface User {
  userId: number;
}

export interface Event {
  eventId: number;
}

export interface IFeedback {
  fid: number;
  userid: User;    // Matches feedback.userid.userId
  eventid: Event;  // Matches feedback.eventid.eventId
  comment: string;
  rating: number;
}
