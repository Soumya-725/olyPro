import { ApiRoutingService } from './../api-routing.service';
import { Component, OnInit } from '@angular/core';
import { ColorDividerService } from '../color-divider.service';

@Component({
  selector: 'sports-list',
  templateUrl: './sports-list.component.html',
  styleUrls: ['./sports-list.component.css']
})
export class SportsListComponent implements OnInit {
  newText = '';
  allSports: any[]

  constructor(private ApiRoutingService: ApiRoutingService, private color_div: ColorDividerService) { }

  ngOnInit() {
    this.ApiRoutingService.getSports$()
        .subscribe(data => {
          this.allSports = data[0];
        },
        error => {
          console.log(error);
        })
  }
  color(t) {
    return this.color_div.color(t);
  }
}
