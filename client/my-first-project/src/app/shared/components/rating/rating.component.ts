import {Component, EventEmitter, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import {map, take} from "rxjs";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonToggle, MatButtonToggleGroup } from "@angular/material/button-toggle";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { Rating } from "../../model/Rating";
import { RatingService } from "../../services/rating.service";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {User} from "../../model/User";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    MatCardActions,
    MatLabel,
    ReactiveFormsModule,
    MatIcon,
    MatInputModule,
    MatButton,
    NgIf,
    FlexLayoutModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatTabGroup,
    MatTab,
    MatCardSubtitle,
    MatCardHeader,
  ],
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() movieId!: string;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  ratingForm: FormGroup = new FormGroup({
    rating: new FormControl(''),
    comment: new FormControl(''),
  });
  rating: number = 0;
  ratingChange = new EventEmitter<number>();
  hoverState: number = 0;
  ratingObject?: Rating;
  userRatings: Rating[] = [];
  critiqueRatings: Rating[] = [];
  isAuthenticated: boolean = false;
  user?: User;

  ngOnInit(): void {
    this.checkUserAuth();
    this.getUserRatings();
    this.getCritiqueRatings();

    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data;
      }, error: (err) => {
        console.log(err);
      }
    });
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

  constructor(private fb: FormBuilder, private _ngZone: NgZone, private ratingService: RatingService, private authService: AuthService, private userService: UserService) {
    this.ratingForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });
  }

  setRating(newRating: number): void {
    this.rating = newRating;
    this.ratingChange.emit(this.rating);
    this.ratingForm.get('rating')?.setValue(newRating);
  }

  setHoverState(hoverState: number): void {
    this.hoverState = hoverState;
  }

  triggerResize() {
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  submitRating(): void {
    if (this.ratingForm.invalid) {
      this.ratingForm.markAllAsTouched();
      return;
    } else {
      this.ratingObject = {
        rating: this.ratingForm.value['rating'],
        comment: this.ratingForm.value['comment'],
        isCritical: this.user!.isCritique,
        userId: this.user!._id,
        movieId: this.movieId,
      }
      this.ratingService.addRating(this.ratingObject).subscribe({
        next: (data: any) => {
        }, error: (err: any) => {
          console.log(err);
        }
      });
      this.ratingForm.reset();
      this.getUserRatings();
      this.getCritiqueRatings();
    }
  }

  getUserRatings() {
    this.ratingService.getUserRatings(this.movieId).subscribe({
      next: (data) => {
        this.userRatings = data;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  getCritiqueRatings() {
    this.ratingService.getCritiqueRatings(this.movieId).subscribe({
      next: (data) => {
        this.critiqueRatings = data;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  deleteRating(id?: string) {
    if(id !== undefined) {
      this.ratingService.delete(id).subscribe({
        next: (data: any) => {
          console.log(data);
          this.getUserRatings();
          this.getCritiqueRatings();
        },
        error: (error: any) => console.log(error)
      });
    }
  }
}
