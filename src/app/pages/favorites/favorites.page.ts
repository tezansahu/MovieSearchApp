import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favoriteMovies: any[] = [];

  constructor(private toastController: ToastController, private storage: Storage) { }

  ngOnInit() {
    console.log("Initialized!!")
    this.storage.get("favorites").then(data => {
      this.favoriteMovies = data;
      console.log(data);
    })
  }

  async showToast(msg: string){
    let toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  removeFavorite(movie){
    console.log("Removing " + movie.Title);
    this.favoriteMovies.splice(this.favoriteMovies.findIndex((favMovie) => favMovie.imdbID == movie.imdbID), 1);
    this.storage.set("favorites", this.favoriteMovies).then((successData) => {
      console.log("Data stored");
      console.log(successData);
    })
    this.showToast("Removed '" + movie.Title + "' from Favorites");
  }

  ngOnDestroy() {
    console.log("Destroying")
    this.storage.set("favorites", this.favoriteMovies).then((successData) => {
      console.log("Data stored");
      console.log(successData);
    })
  }

}
