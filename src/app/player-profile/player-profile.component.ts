import { ApiRoutingService } from './../api-routing.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorDividerService } from '../color-divider.service';

@Component({
  selector: 'player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {
  player_id: any;
  player_details: any;
  p_sport_id: any;
  p_sport_name: any;
  p_player_name: any;
  p_player_image: any;
  p_twitter_username: any;
  twitters: any[];
  p_insta_username: any;
  instas: any[];
  youTube: any[];
  isYoutubeHide: boolean = false;
  isTwitterHide: boolean = false;
  isInstaHide: boolean = false;
  isSocialLoading: boolean = true;
  loadingCount: number;

  constructor(private route: ActivatedRoute, private ApiRoutingService: ApiRoutingService, private Router: Router, private color_div: ColorDividerService) { }

  ngOnInit() {
    this.loadingCount = 0;
    this.route.paramMap
      .subscribe( params=> {
        this.player_id = params.get('player_id');
      })

    this.ApiRoutingService.getPlayerDet$(this.player_id)
      .subscribe(player_details => {
        this.player_details = player_details[0][0];
        this.p_sport_id = this.player_details.sport_id;
        this.p_sport_name = this.player_details.sport_name;
        this.p_player_name =  this.player_details.player_name;
        this.p_twitter_username = this.player_details.player_det_twitter;
        this.p_insta_username = this.player_details.player_det_insta;
        this.p_player_image = this.player_details.player_image;

        this.ApiRoutingService.getTwit$(this.p_twitter_username)
        .subscribe(tData => {
          // console.log(tData)
          this.twitters = tData;
          this.loadingCount++; 
          if(this.loadingCount >= 2 ) {
            this.isSocialLoading = false;
          }
          
        },
        err=>{
          
        })
        this.ApiRoutingService.getInsta$(this.p_insta_username)
        .subscribe(tData => {
          // console.log(tData)
          this.instas = tData;
          this.loadingCount++; 
          if(this.loadingCount >= 2 ) {
            this.isSocialLoading = false;
            
          }
        },
        err=> {
        
        })
        this.ApiRoutingService.getuTube$(this.p_player_name)
        .subscribe(uData => {
          this.youTube = uData;
          this.loadingCount++;
          if(this.loadingCount >= 2) {
            this.isSocialLoading = false;
          }
          
        },
        err => {
          
        })
      },
      err=> {
        this.Router.navigateByUrl("/notFound", { skipLocationChange: true });
      })
  }

  color(t) {
    return this.color_div.color(t);
  } 
}

