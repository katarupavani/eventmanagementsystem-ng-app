import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookEventservice {
   constructor(private httpclient:HttpClient){}

   baseurl:String="/api";

   getBookEvents(){
    return this.httpclient.get<any>(this.baseurl+"/bookings")
   }



  createBooking(booking: any) {
    return this.httpclient.post(this.baseurl+"/bookings/create",booking)
  }
}
