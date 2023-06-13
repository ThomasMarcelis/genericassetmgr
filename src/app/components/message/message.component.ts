// message.component.ts

import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.messages$.subscribe(messages => {
      this.messages = messages;
    });
  }

  createMessage() {
    // Create message logic here
  }

  updateMessage() {
    // Update message logic here
  }

}
