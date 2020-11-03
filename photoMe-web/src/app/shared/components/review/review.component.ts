import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../models/Review';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input() review: Review;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.review);
    
    this.userService.setDefaultAvatar(this.review.maker);
  }
}
