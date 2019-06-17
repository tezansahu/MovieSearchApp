import { Component, OnInit } from '@angular/core';
import { MovieService, SearchType } from '../../services/movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  results: Observable<any>;
  searchTerm: string = '';
  type: SearchType = SearchType.all;

  

  constructor(private movieService: MovieService) { }

  ngOnInit() {}

  async searchChanged() {
    // Call our service function which returns an Observable
    console.log("In searchChanged()")
    console.log(this.searchTerm, this.type)
    // this.movieService.searchData(this.searchTerm, this.type).subscribe(res => {
    //   this.results = res;
    //   console.log(this.results)
    // });

    this.results = this.movieService.searchData(this.searchTerm, this.type)
    // console.log(this.results)
  }
}
