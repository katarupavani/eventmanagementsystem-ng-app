import { Component } from '@angular/core';
import { Profilepage } from '../profilepage/profilepage';
import { User } from '../user/user';

@Component({
  selector: 'app-registeruser',
  imports: [Profilepage,User],
  templateUrl: './registeruser.html',
  styleUrl: './registeruser.css'
})
export class Registeruser {

}
