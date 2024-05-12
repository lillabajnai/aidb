import {Component, Input} from '@angular/core';
import {MatGridList, MatGridTile, MatGridTileText} from "@angular/material/grid-list";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {TopNavBarComponent} from "../top-nav-bar/top-nav-bar.component";
import {WatchlistService} from "../../services/watchlist.service";
import {UserService} from "../../services/user.service";
import {User} from "../../model/User";

@Component({
  selector: 'app-grid-layout',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    NgOptimizedImage,
    MatGridTileText,
    NgForOf,
    MatCardImage,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardTitle,
    MatCardSubtitle,
    MatIcon,
    RouterLink,
    TopNavBarComponent
  ],
  templateUrl: './grid-layout.component.html',
  styleUrl: './grid-layout.component.scss'
})

export class GridLayoutComponent {
  @Input() movies!: any[];
  user?: User;

  constructor(private watchlistService: WatchlistService, private userService: UserService) {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  addToWatchlist(movieId: string) {
    console.log(movieId);
    console.log(this.user?._id);
      this.watchlistService.addMovie(movieId, this.user?._id)?.subscribe({
        next: (data: any) => {
        }, error: (err: any) => {
          console.log(err);
        }
      });
  }
}
