export interface User {
     userId: number;
     }

export interface Event {
     eventId: number; 
    }

export interface IFeedback {
     fid: number; 
     userid: User; 
     eventid: Event;
      comment: string; 
      rating: number;
     }