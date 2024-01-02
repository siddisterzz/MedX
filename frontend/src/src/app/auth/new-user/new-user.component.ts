import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  constructor(public authService : AuthService,private router:Router){}
  register(){
    event?.preventDefault()
    const name = document.getElementById("name") as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const cpassword = document.getElementById('cpassword') as HTMLInputElement;
    const MobileNo = document.getElementById('mobile') as HTMLInputElement;
    console.log(name,email)
    if(password.value==cpassword.value){
      if (name && email && password && MobileNo) {
        const response=this.authService.registerUser(name.value,email.value,MobileNo.value,password.value)
        response.subscribe(response=>{
          const body=response.body
          if(body.status==="failed"){
            console.log(body.data)
            alert(body.data)
          }else{
            this.router.navigate(['/login'])
          }
        })
      }
    }
    else{
      alert("Password not matched")
    }
  }
}
