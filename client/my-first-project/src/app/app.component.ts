import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AComponentComponent } from './a-component/a-component.component';
import { BComponentComponent } from './b-component/b-component.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TopNavBarComponent } from './shared/components/top-nav-bar/top-nav-bar.component';
import { LoginComponent } from "./shared/components/login/login.component";
import {RatingComponent} from "./shared/components/rating/rating.component";
import {GridLayoutComponent} from "./shared/components/grid-layout/grid-layout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AComponentComponent,
    BComponentComponent,
    SignupComponent,
    TopNavBarComponent,
    LoginComponent,
    GridLayoutComponent,
    RatingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-first-project test';
}
