import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

declare var Razorpay: any;

@Component({
  selector: 'app-razorpay',
  templateUrl: './razorpay.component.html',
  styleUrls: ['./razorpay.component.css']
})
export class RazorpayComponent implements OnInit {
  constructor(private http: HttpClient, private router:Router,private location: Location) {}
  @Input() amount: number = 0;
  razorpayOptions: any = {
    key: 'rzp_test_zUGVgemrGsmL8z',
    amount: 0,
    currency: 'INR',
    name: 'MedX',
    description: 'Purchase Description',
    image: 'https://your-company-logo-url',
    handler: (response: any) => {
      this.razorpaySuccessHandler(response);
    },
    prefill: {
      name: 'Siddhanth Sinha',
      email: 'siddhanthsinha1401@gmail.com'
    },
    notes: {
      address: 'Razorpay Corporate Office'
    },
    theme: {
      color: '#F37254'
    }
  };
  ngOnInit(): void {
    let amt = localStorage.getItem('total')
    let amt1=0
    if (amt!==null){
      amt1 = parseInt(amt)
    }
    this.razorpayOptions.amount = amt1*100
    localStorage.removeItem('total')
  }

  initiatePayment() {
    const options = {
      ...this.razorpayOptions,
      modal: {
        ondismiss: () => {
          this.razorpayFailureHandler();
        }
      }
    };
    console.log(this.amount)
    Razorpay.open(options);
  }

  refreshPage(): void {
    this.location.go(this.location.path());
  }

  razorpaySuccessHandler(response: any) {
    console.log(response);
    // Handle success callback
    const authData  = {data:{status:name , email:localStorage.getItem('user') , medicines:localStorage.getItem('cart')}};
    const response1 = this.http.post<any>("http://localhost:3000/order/place", authData, { observe: 'response' });
    response1.subscribe(response=>{
      const body=response.body
      console.log('response',body.data)
      localStorage.removeItem('cart')
      localStorage.setItem('cart',JSON.stringify([]))
    })
    alert('Payment successful!');
    this.router.navigate(['/branded'])
  }

  razorpayFailureHandler() {
    // Handle failure callback
    alert('Payment failed!');
    window.location.reload();
  }
}
