import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { MessageDto } from '../../models/messagedto';
import { User } from '../../models/User';
import { AlertifyService } from '../../services/alertify.service';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit, OnChanges {
  @Input() contactId: string;

  message: string;
  isTexting: boolean;
  contactUser: User = new User();
  messageList: MessageDto[] = [];

  constructor(private userService: UserService, private messageService: MessageService, private alertify: AlertifyService,
    private chatService: ChatService, private authService: AuthService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadUserInfo(this.contactId);
    this.loadTalkMessages(this.contactId);
  }

  ngOnInit(): void {
    this.isTexting = false;
    this.loadUserInfo(this.contactId);
    this.loadTalkMessages(this.contactId);

    this.chatService.retrieveMappedObject().subscribe((receivedObj: MessageDto) => { this.addToInbox(receivedObj); });
  }

  onMessageChange(): void {
    if (this.message !== null || this.message !== undefined || this.message !== '') {
      this.isTexting = true;
    }

    if (this.message === '') {
      this.isTexting = false;
    }
  }

  loadTalkMessages(contactId: string): void {
    if (contactId !== null && contactId !== '' && contactId !== undefined) {
      this.messageService.getTalkMessage(this.contactId).subscribe((res) => {
        this.messageList = res;
        this.messageList.forEach(message => {
            message.receiverId === this.contactId ? message.messageType = 'send' : message.messageType = 'receive';
        });
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  loadUserInfo(userId: string): void {
    if (this.contactId !== null && this.contactId !== undefined && this.contactId !== '') {
      this.userService.getUserById(this.contactId).subscribe((res) => {
        this.contactUser = res;
        this.userService.setDefaultAvatar(this.contactUser);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  sendMessage(): void {
    console.log(this.message);
    if (this.message === null || this.message === '' || this.message === undefined) {
      this.alertify.error('Bạn phải nhập tin nhắn trước khi gửi!');
    }
    else {
      const messageDto = new MessageDto();
      messageDto.messageType = 'send';
      messageDto.content = this.message;
      messageDto.receiverId = this.contactId;
      messageDto.senderId = this.authService.decodedToken.nameid;
      this.chatService.broadcastMessage(messageDto);
    }
  }

  addToInbox(messageDto: MessageDto): void{
    const newMessage = new MessageDto();
    newMessage.senderId = messageDto.senderId;
    newMessage.messageType = messageDto.messageType;
    newMessage.receiverId = messageDto.receiverId;
    newMessage.content = messageDto.content;
    console.log(newMessage);
    this.messageList.push(newMessage);
  }

  onKeyDown(event): void {
    event.preventDefault();
    this.sendMessage();
    this.message = '';
  }
}
