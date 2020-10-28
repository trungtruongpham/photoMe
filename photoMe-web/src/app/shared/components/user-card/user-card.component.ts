import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from '../../models/Photo';
import { User } from '../../models/User';
import { AlertifyService } from '../../services/alertify.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() userId: string;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onATagClick = new EventEmitter<string>();

  userContact: User = new User();

  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    if (this.userId !== undefined) {
      this.userService.getUserById(this.userId).subscribe((res) => {
        this.userContact = res;
        this.userService.setDefaultAvatar(this.userContact);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  onClickATag(): void {
    this.onATagClick.emit(this.userContact.id);
  }
}
