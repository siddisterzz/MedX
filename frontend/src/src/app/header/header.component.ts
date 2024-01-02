import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated: boolean = false;
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean =false;
  constructor(private authService: AuthService) {}
  ngOnInit(): void{
    this.authService.isAuthenticated.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
  })
}
  SideNavToggled(){
    this.menuStatus = !this.menuStatus
    this.sideNavToggled.emit(this.menuStatus);
  }
}
