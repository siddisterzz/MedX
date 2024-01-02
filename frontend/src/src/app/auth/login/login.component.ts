import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public authService : AuthService, private router:Router,private cookieService: CookieService){}
  onLogin(){
    event?.preventDefault()
    const email = document.getElementById("email") as HTMLInputElement
    const password = document.getElementById("password") as HTMLInputElement
    const response = this.authService.login(email.value, password.value);
    response.subscribe((response)=>{
      const body=response.body
      if(body.status==="success"){
        console.log('response',response)
        console.log(this.cookieService.get('userData'))
        const userData = JSON.parse(this.cookieService.get('userData'))
        console.log(userData.email,userData.cart)
        localStorage.setItem('user', userData.email);
        let cart =JSON.stringify(userData.cart.cart);
        console.log(cart)
        localStorage.setItem('cart',cart);
        this.router.navigate(['/branded'])
      }
      else{
        alert(body.data)
      }
      });
}
}
