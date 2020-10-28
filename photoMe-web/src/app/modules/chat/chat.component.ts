import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/shared/services/alertify.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  message: string;
  isTexting: boolean;
  listContactId: string[] = [];
  contactId: string;

  constructor(private messageService: MessageService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.isTexting = false;

    this.messageService.getListContact().subscribe((res) => {
      this.listContactId = res;
      this.loadData();
    }, error => {
      this.alertify.error(error);
    });
  }

  loadData(): void {
    if (this.contactId === null || this.contactId === undefined || this.contactId === '') {
      this.contactId = this.listContactId[0];
    }
  }

  onMessageChange(): void {
    if (this.message !== null || this.message !== undefined || this.message !== '') {
      this.isTexting = true;
    }

    if (this.message === '') {
      this.isTexting = false;
    }
  }

  onSelectContact(contactId: string): void {
    this.contactId = contactId;
  }
}
