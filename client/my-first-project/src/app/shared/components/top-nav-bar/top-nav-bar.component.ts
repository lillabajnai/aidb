import {Component, HostListener, OnInit} from '@angular/core';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {NgIf, NgStyle} from "@angular/common";
import {LoginComponent} from "../login/login.component";
import {AuthService} from "../../services/auth.service";
import { Router } from '@angular/router';
import {User} from "../../model/User";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-top-nav-bar',
  standalone: true,
  imports: [
    MatIconModule,
    MatLabel,
    MatInput,
    MatSuffix,
    MatIconButton,
    MatFormField,
    NgStyle,
    NgIf,
    LoginComponent
  ],
  templateUrl: './top-nav-bar.component.html',
  styleUrl: './top-nav-bar.component.scss'
})
export class TopNavBarComponent implements OnInit {
  showHoverWindow: boolean = false;
  hoverWindowSize: string = '';
  isAuthenticated: boolean = false;
  user?: User;

  ngOnInit() {
    this.calculateHoverWindowSize();
    this.checkUserAuth();
  }

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateHoverWindowSize();
  }

  calculateHoverWindowSize() {
    this.hoverWindowSize = (window.innerWidth / 4) + 'px';
  }

  mouseEnter() {
    this.showHoverWindow = true;
  }

  mouseLeave() {
    this.showHoverWindow = false;
  }

  checkUserAuth() {
    this.authService.checkAuth().subscribe(
      {
        next: (isAuthenticated: boolean) => {
          this.isAuthenticated = isAuthenticated;
        },
        error: (error) => {
          this.isAuthenticated = false;
          console.log(error);
        }
      }
    );
  }

  logoutUser() {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Successfully logged out', response);
        this.router.navigateByUrl("/");
        this.checkUserAuth();
      },
      error: (error) => {
        console.error(error);
      }
  });
  }
}
