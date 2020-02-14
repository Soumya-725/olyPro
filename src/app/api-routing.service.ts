import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRoutingService {
  
  allSportsUrl = 'http://localhost:8080/api/sports';
  players_by_sport_catUrl = 'http://localhost:8080/api/sports/';
  player_detailsUrl = 'http://localhost:8080/api/player/';
  getTwit = 'http://localhost:8080/api/twit/'
  getInsta = 'http://localhost:8080/api/insta/'
  getuTube = 'http://localhost:8080/api/uTube/'
  searchResult = 'http://localhost:8080/api/search/'

  constructor(private http: HttpClient) { }
  getSports$(): Observable<any> {
    return this.http.get(this.allSportsUrl);
  }
  getPlayers$(sport_id): Observable<any> {
    return this.http.get(this.players_by_sport_catUrl+sport_id);
  }
  getPlayerDet$(player_id): Observable<any> {
    return this.http.get(this.player_detailsUrl+player_id);
  }
  getTwit$(username): Observable<any>{
    return this.http.get(this.getTwit+username);
  }
  getInsta$(username): Observable<any>{
    return this.http.get(this.getInsta+username);
  }
  getuTube$(username): Observable<any>{
    return this.http.get(this.getuTube+username);
  }
  getSearch$(searchData): Observable<any>{
    return this.http.get(this.searchResult+searchData);
  }
}
