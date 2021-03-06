import { ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AlertifyService } from '../../services/alertify.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-chat-dialog',
  templateUrl: './new-chat-dialog.component.html',
  styleUrls: ['./new-chat-dialog.component.scss'],
})
export class NewChatDialogComponent implements OnInit {
  @Input() displayModal: boolean;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onHideModalPopup = new EventEmitter<boolean>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSubmitNewChat = new EventEmitter<string>();
  username: string;
  listUser: User[] = [];
  currentUser: User;
  header = 'New chat';
  sendTo = 'Send To: ';
  userInput = 'Insert username';

  constructor(
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.currentUser = new User();
  }

  searchUserContact(): void {
    if (
      this.username !== undefined ||
      this.username !== null ||
      this.username !== ''
    ) {
      this.userService.searchUser({ username: this.username }).subscribe(
        (res) => {
          this.listUser = res;
        },
        (error) => {
          this.alertify.error('Load user failed!');
        }
      );
    }
  }

  onHideModal(): void {
    if (
      this.username !== undefined ||
      this.username !== null ||
      this.username !== ''
    ) {
      this.username = '';
    }

    this.displayModal = !this.displayModal;
    this.onHideModalPopup.emit(this.displayModal);
  }

  onSelectUser(userId: string): void {
    this.userService.getUserById(userId).subscribe(
      (res) => {
        this.currentUser = res;
        this.username = this.currentUser.name;
        console.log(this.username);
        this.listUser = this.listUser.filter((u) => u.name === this.username);
        console.log(this.listUser);
      },
      (error) => {
        this.alertify.error('');
      }
    );
  }

  onSubmitNewChatEvent(): void {
    if (
      this.username !== undefined ||
      this.username !== null ||
      this.username !== ''
    ) {
      this.onSubmitNewChat.emit(this.currentUser.id);
    }

    this.displayModal = false;
  }
}
