import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(){}
  selectedMedicines: any[] = [];
  public quantity: number[] = [];
  public removeStatus: boolean[] = []
  public price:number[]=[]
  public priceg:number[]=[]
  public bprice:number[]=[]
  public gprice:number[]=[]
  public bsum=0
  public gsum=0
  public suum=0
  public cartStatus=false
  ngOnInit(): void {
    const cart = localStorage.getItem('cart')
    if(cart!==null){
      this.selectedMedicines = JSON.parse(cart)
    }
    console.log(this.selectedMedicines)
    this.quantity = Array(this.selectedMedicines.length).fill(1);
    this.removeStatus = Array(this.selectedMedicines.length).fill(true)
    this.price = Array(this.selectedMedicines.length)
    this.price = this.selectedMedicines.map(({ brandp }) => brandp);
    this.bprice = this.price.map((num, index) => num * this.quantity[index]);
    this.priceg = this.selectedMedicines.map(({ genp }) => genp);
    this.gprice = this.priceg.map((num, index) => num * this.quantity[index]);
    this.bsum = this.bprice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    this.gsum = this.gprice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    localStorage.setItem('total',"248")

    console.log(this.bprice,this.bsum)
  }
  remove(item:any){
    const i=this.selectedMedicines.indexOf(item)
    this.removeStatus[i] = !this.removeStatus[i]
    this.selectedMedicines[i]={}
    this.quantity[i]=-1
    console.log(this.selectedMedicines,this.removeStatus)
    this.selectedMedicines = this.selectedMedicines.filter(item => Object.keys(item).length !== 0);
    this.quantity = this.quantity.filter(item => item !== -1);
    this.removeStatus = Array(this.selectedMedicines.length).fill(true)
    console.log(this.selectedMedicines,this.quantity,this.removeStatus)
    localStorage.removeItem('cart')
    localStorage.setItem('cart',JSON.stringify(this.selectedMedicines))
  }
  increseQuantity(item:any){
    const i=this.selectedMedicines.indexOf(item)
    this.quantity[i] = this.quantity[i] + 1;
    this.bprice= this.price.map((num, index) => num * this.quantity[index]);
    this.bsum = this.bprice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    this.gprice = this.priceg.map((num, index) => num * this.quantity[index]);
    this.gsum = this.gprice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }
  decreaseQuantity(item:any){
    const i=this.selectedMedicines.indexOf(item)
    this.quantity[i] = this.quantity[i] - 1;
    if(this.quantity[i]==0){
      this.remove(item)
      return
    }
    this.bprice= this.price.map((num, index) => num * this.quantity[index]);
    this.bsum = this.bprice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    this.gprice = this.priceg.map((num, index) => num * this.quantity[index]);
    this.gsum = this.gprice.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  }

  bbutton(){
    localStorage.removeItem('total')
    localStorage.setItem('total',this.bsum.toString())
    console.log(localStorage.getItem('total'))
  }
  gbutton(){
    localStorage.removeItem('total')
    localStorage.setItem('total',this.gsum.toString())
    console.log(localStorage.getItem('total'))

  }
  cstatus(){
    this.cartStatus=true
  }
}
