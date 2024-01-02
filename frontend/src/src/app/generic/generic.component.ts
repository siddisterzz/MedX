import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.css']
})
export class GenericComponent {
  constructor(private http: HttpClient) {}
  list : any[]=[]
  ngOnInit() : void{
    const response1=this.http.post<any>("http://localhost:3000/generic/getgenmeds", { observe: 'response' });
    response1.subscribe(response=>{
      const status = response.status
      if(status==="success"){
        this.list=Array.isArray(response.data) ? response.data : [response.data]
      }
    })
  }
}
