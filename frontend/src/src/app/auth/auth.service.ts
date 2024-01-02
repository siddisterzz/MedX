import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() isAuthenticated: EventEmitter<boolean> = new EventEmitter<boolean>();
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  selectedMedicines: any[] = [];
  status : boolean =false
  document: Document = window.document!;
  cart=""



  constructor(private http: HttpClient, private router:Router) {}

  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticated.emit(isAuthenticated);
  }
  public isLoggedIn(): boolean {
    // check if user is logged in
    console.log(this.isLoggedInSubject.asObservable())
    const isLoggedIn = localStorage.getItem('user');
    return isLoggedIn !== null
  }

  public registerUser(name: string , email: string , mobileno: String ,password: string){
    const authData  = {data:{name:name , email:email , mobileno:mobileno , password:password}};
    return this.http.post<any>("http://localhost:3000/user/register", authData, { observe: 'response' });
  }

  public login(email:String,password:String) {
    // login user
    const body={data:{email:email,password:password}}
    this.setAuthenticated(true);
    return this.http.post<any>("http://localhost:3000/user/login", body, {observe:'response',withCredentials: true})
  }


  public logout(): void {
    //move current cart item and email to Cart Collection
    const cart = localStorage.getItem('cart')
    if(cart!==null){
      this.selectedMedicines=JSON.parse(cart)
    }
    const userData={data:{email:localStorage.getItem('user'),cart:this.selectedMedicines}}
    const response=this.http.post<any>("http://localhost:3000/cart/addtoCart", userData, { observe: 'response' });
    response.subscribe(response=>{
      const body=response.body
      if(body.status==="success"){
        console.log("info saved")
      }
      else{
        console.log("failed")
      }
    })

    //destroy session
    const response1=this.http.post<any>("http://localhost:3000/user/logout", { observe: 'response' });
    response1.subscribe(response=>{
      const body=response.body
      if(body.status==="success"){
        console.log("session deleted")
      }
      else{
        console.log("failed1")
      }
    })

    // logout user
    localStorage.removeItem('user');
    localStorage.removeItem('cart');

    //
    this.setAuthenticated(false);

    this.router.navigate(['/login'])
  }
}
