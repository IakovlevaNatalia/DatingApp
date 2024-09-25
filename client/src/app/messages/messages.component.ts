import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { MemberListComponent } from '../members/member-list/member-list.component';
import { MemberDetailsComponent } from '../members/member-details/member-details.component';
import { ListsComponent } from '../lists/lists.component';
import { MessageService } from '../_services/message.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { Message } from '../_models/message';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    RouterModule,
    MemberListComponent,
    MemberDetailsComponent,
    ListsComponent,
    PaginationModule,
    ButtonsModule,
    FormsModule,
    RouterLink, 
    TimeagoModule
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
messageService = inject(MessageService);
container = 'Unred';
pageNumber = 1;
pageSize = 5;
isOutbox = this.container === 'Outbox';


ngOnInit(): void {
  this.loadMessages();
}

loadMessages() {
  this.messageService.getMessages(this.pageNumber, this.pageSize, this.container);
}
deleteMessage(id: number) {
  this.messageService.deleteMessage(id).subscribe({
    next: _ => {
      this.messageService.paginatedResult.update(prev => {
        if (prev && prev.items) {
          prev.items.splice(prev.items.findIndex(m => m.id === id), 1);
          return prev;
        }
        return prev;
      })
    }
  })
}
getRoute(message: Message) {
  if (this.container === 'Outbox') return `/members/${message.recipientUsername}`;
  else return `/members/${message.senderUsername}`;
}
pageChanged(event: any) {
  if (this.pageNumber !== event.page) {
    this.pageNumber = event.page;
    this.loadMessages();
  }
 }
}