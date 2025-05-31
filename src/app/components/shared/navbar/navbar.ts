import { Component } from '@angular/core';
import {RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  hide : boolean = true;
  toggleMenu(){
    if(this.hide){
      this.hide = false;
    }else{
      this.hide = true;
    }

  }
}
