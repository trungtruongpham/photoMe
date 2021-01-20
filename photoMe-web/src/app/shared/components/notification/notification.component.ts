import { Component, Input, OnInit } from '@angular/core';
import { Notification } from '../../models/Notification';
import { User } from '../../models/User';
import { AlertifyService } from '../../services/alertify.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() noti: Notification;

  sender: User;

  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.sender = new User();
    this.loadNotiInfo();
  }

  loadNotiInfo(): void {
    if (this.noti === null || this.noti === undefined) {
      this.alertify.error('Failed to load user info :( ! Please try again later!');
      return;
    }

    this.userService.getUserById(this.noti.senderId).subscribe((res) => {
      this.sender = res;
      this.userService.setDefaultAvatar(this.sender);
    }, error => {
      this.alertify.error('Failed to load user info :( ! Please try again later!');
    });
  }
}
