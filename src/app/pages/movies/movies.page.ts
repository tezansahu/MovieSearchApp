import { Component, OnInit } from '@angular/core';
import { MovieService, SearchType } from '../../services/movie.service';
import { Observable } from 'rxjs';
import {ToastController} from '@ionic/angular'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  results: Observable<any>;
  searchTerm: string = '';
  type: SearchType = SearchType.all;

  favorites: any[] = [];

  constructor(private movieService: MovieService, private toastController: ToastController, private storage: Storage) { }

  ngOnInit() {
    this.storage.get("favorites").then(data => {
      if(data != undefined){
        this.favorites = data;
        console.log(data);
      }
    })
    console.log(this.favorites.findIndex((favMovie) => favMovie.Title == "ABCD"));
  }

  async searchChanged() {
    // Call our service function which returns an Observable
    console.log("In searchChanged()")
    console.log(this.searchTerm, this.type)

    this.results = this.movieService.searchData(this.searchTerm, this.type)
  }

  addFavorite(movie: any){
    console.log(movie)
    if(this.favorites.findIndex((favMovie) => favMovie.imdbID == movie.imdbID) == -1){
      this.favorites.push(movie)
      this.storage.set("favorites", this.favorites).then((successData) => {
        console.log("Data stored");
        console.log(successData);
      })
      this.showToast("'" + movie.Title + "' added to Favorites!");
    }
    else{
      this.showToast("'" + movie.Title + "' is already added to Favorites!");
    }
    
  }

  async showToast(msg: string){
    let toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  onDestroy(){
    this.storage.set("favorites", this.favorites).then((successData) => {
      console.log("Data stored");
      console.log(successData);
    })
  }
}
