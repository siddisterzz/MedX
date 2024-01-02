import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router:Router){}
  public shopNow(){
    if(localStorage.getItem('user')!==null){
      this.router.navigate(['/branded'])
    }else{
      this.router.navigate(['/login'])
    }
  }
}
