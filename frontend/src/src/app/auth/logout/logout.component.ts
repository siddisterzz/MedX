import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(public authService : AuthService, private router:Router){}

  public logout(){
    const response = this.authService.logout();
  }
  public redirectToShopping(){
    this.router.navigate(['/branded'])
  }

}
