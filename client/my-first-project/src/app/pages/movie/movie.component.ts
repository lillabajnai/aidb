import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { NgIf } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";
import { RatingComponent } from "../../shared/components/rating/rating.component";
import { Movie } from "../../shared/model/Movie";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  standalone: true,
  imports: [
    NgIf,
    RatingComponent,
    MatGridList,
    MatGridTile
  ],
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movieId!: any;
  movie!: Movie;

  constructor(private movieService: MovieService, private router: Router,  private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id');
    });

    this.movieService.getMovieById(this.movieId).subscribe(
      (data: Movie) => {
        this.movie = data;
      },
      (error: any) => {
        console.error('Error fetching movie details', error);
      }
    );
  }
}
