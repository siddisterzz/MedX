import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() sideNavStatus: boolean =false;
  list=[
    {
      number:'1',
      name:'Branded Medicines',
      icon:'fa-solid fa-b',
      link:'branded'
    },
    {
      number:'2',
      name:'Generic Medicines',
      icon:'fa-solid fa-g',
      link:'generic'
    },
    {
      number:'3',
      name:'Your Cart',
      icon:'fa-solid fa-cart-shopping',
      link:'cart'
    },
    {
      number:'4',
      name:'Invoice',
      icon:'fa-solid fa-file-invoice',
      link:'invoice'
    },
    {
      number:'5',
      name:'Logout',
      icon:'fa-solid fa-right-from-bracket',
      link:'logout'
    }
  ]
  constructor(){}
  ngOnInit(): void {

  }
}
