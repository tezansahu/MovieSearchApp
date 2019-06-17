import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Typescript custom enum for search types (optional)
export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  url = 'http://www.omdbapi.com/';
  apiKey = 'a947a218';

  constructor(private http: HttpClient) { }

  searchData(title: string, type: SearchType): Observable<any> {
    console.log("In searchData()")
    return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`).pipe(
      map(results => results["Search"])
    );
  }

  getDetails(id){
    return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`)
  }
}
