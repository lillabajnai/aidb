import { Component, OnInit } from '@angular/core';
import {MatCard, MatCardActions, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {User} from "../../shared/model/User";
import {UserService} from "../../shared/services/user.service";
import {WatchlistService} from "../../shared/services/watchlist.service";
import {Watchlist} from "../../shared/model/Watchlist";
import {Movie} from "../../shared/model/Movie";
import {MovieService} from "../../shared/services/movie.service";

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardActions,
    MatButton,
    NgForOf
  ],
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  items: Watchlist[] = [];
  watchlist: any[] = [];
  user?: User;

  constructor(private watchlistService: WatchlistService, private userService: UserService, private movieService: MovieService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data;
        this.getWatchlist(this.user?._id);
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  getWatchlist(id: string): void {
    if(this.user?._id !== null) {
      this.watchlistService.getWatchlist(id).subscribe({
        next: (data) => {
          this.items = data;
          console.log(this.items);
          this.getMovie();
        }, error: (err: any) => {
          console.log(err);
        }
      });
    }
  }

  getMovie() {
    for (const item of this.items) {
      this.movieService.getMovieById(item.movieId).subscribe(
        (data: any) => {
          this.watchlist.push(data);
        },
        (error: any) => {
          console.error('Error fetching movie details', error);
        }
      );
    }
  }
}
