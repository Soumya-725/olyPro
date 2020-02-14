import { ApiRoutingService } from './../api-routing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sports-list',
  templateUrl: './sports-list.component.html',
  styleUrls: ['./sports-list.component.css']
})
export class SportsListComponent implements OnInit {
  newText = '';
  allSports: any[]

  constructor(private ApiRoutingService: ApiRoutingService) { }

  ngOnInit() {
    this.ApiRoutingService.getSports$()
        .subscribe(data => {
          this.allSports = data[0];
        },
        error => {
          console.log(error);
        })
  }
  color(t){
    this.newText = '';
    let nt = t.split(' ');
    for(let i = 0; i < nt.length; i++) {
      if (i % 2 == 0) {
        this.newText += nt[i];
      } else {
        this.newText += `<span class="page-1"> ${nt[i]} </span>`;
      }
    }
    return this.newText;
  
  }

}
