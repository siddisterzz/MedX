import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FilterPipe } from './filter.pipe';

@Component({
  selector: 'app-branded',
  templateUrl: './branded.component.html',
  styleUrls: ['./branded.component.css']
})
export class BrandedComponent {
  searchText:any
  constructor(private http: HttpClient,private router:Router) {
  }
  list: any[]=[]
  selectedMedicines: any[] = [];
  public clickedButtons: boolean[] = Array(200).fill(false);
  ngOnInit(): void {
    this.selectedMedicines=[]
    const cart=localStorage.getItem('cart')
    if(cart !== null){
      const dataArray : any[] = JSON.parse(cart)
      this.selectedMedicines=dataArray
    }
    console.log(typeof this.selectedMedicines,this.selectedMedicines)
    const response = this.http.post<any>("http://localhost:3000/medicine/list", { observe: 'response' });
    response.subscribe(response=>{
      const body=response.body
      console.log('response',response.data)
      this.list=Array.isArray(response.data) ? response.data : [response.data]
      console.log(this.list)
      this.list.forEach((med,index)=>{
        this.selectedMedicines.forEach((cmed)=>{
          if(med.brandname===cmed.brandname){
            this.clickedButtons[index] = !this.clickedButtons[index];
          }
        })
      })
    });
  }
  addToCart(med:any,i:number){
    const isPresent = this.selectedMedicines.some(item => item.brandname === med.brandname);
    const index = this.selectedMedicines.findIndex(item => item.brandname === med.brandname);
    if(!isPresent){
      this.selectedMedicines.push(med)
      this.clickedButtons[i] = !this.clickedButtons[i];
    }
    else{
        this.selectedMedicines.splice(index, 1);
        this.clickedButtons[i] = !this.clickedButtons[i];
    }
    console.log(this.selectedMedicines,this.clickedButtons,i)
    localStorage.removeItem('cart')
    localStorage.setItem('cart',JSON.stringify(this.selectedMedicines))
    const cart=localStorage.getItem('cart')
    if(cart !== null){
        console.log(localStorage.getItem('cart'),JSON.parse(cart))
    }
  }
  moveToCart(){
    this.router.navigate(['/cart'])
  }
}
