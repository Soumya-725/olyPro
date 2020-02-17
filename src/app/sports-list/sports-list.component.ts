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
  scroll: number = 0;
  hideloading: boolean;
  scrollLoadingOff: boolean = true;

  constructor(private ApiRoutingService: ApiRoutingService, private color_div: ColorDividerService) { }

  ngOnInit() {
    this.ApiRoutingService.getSports$(this.scroll)
      .subscribe(data => {
        this.allSports = data[0];
        this.hideloading = true;
      },
        error => {
          console.log(error);
        })
  }
  color(text: string) {
    return this.color_div.color(text);
  }
  onScroll() {
    this.scroll++;
    this.hideloading = false;
    this.ApiRoutingService.getSports$(this.scroll)
      .subscribe(data1 => {
        if (data1[0].length != 0) {
          this.allSports = this.allSports.concat(data1[0]);
          this.hideloading = true;
        }
        else {
          this.scrollLoadingOff = false;
        }
      },
        error => {
          console.log(error);
        })
  }
}
