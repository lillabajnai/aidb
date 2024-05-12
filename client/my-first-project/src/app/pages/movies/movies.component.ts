import {Component, OnInit} from '@angular/core';
import {GridLayoutComponent} from "../../shared/components/grid-layout/grid-layout.component";
import {Movie} from "../../shared/model/Movie";
import {MovieService} from "../../shared/services/movie.service";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    GridLayoutComponent
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
    for (const movie of this.movies) {
      this.movieService.addMovie(movie).subscribe({
        next: (data: any) => {
          console.log(data);
          this.movies = [];
        }, error: (err: any) => {
          console.log(err);
        }
      });
    }

    this.movieService.getAllMovies().subscribe({
      next: (data) => {
        this.movies = data;
        console.log(this.movies);
      }, error: (err) => {
        console.log(err);
      }
    });
  }
}
