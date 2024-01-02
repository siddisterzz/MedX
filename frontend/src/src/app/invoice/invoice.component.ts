import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  email=""
  name=""
  list: any[]=[]
  constructor(private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
    const user=localStorage.getItem('user')
    const data1 = {data:{email:user}}
    const response = this.http.post<any>("http://localhost:3000/order/getOrders",data1, { observe: 'response' });
    response.subscribe(response=>{
      const body=response.body
      console.log('response',response.body)
      this.list=Array.isArray(response.body.data) ? response.body.data : [response.body.data]
      console.log(this.list)
    });
  }

}
