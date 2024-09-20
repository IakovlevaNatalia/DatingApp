import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MemberListComponent } from '../members/member-list/member-list.component';
import { MemberDetailsComponent } from '../members/member-details/member-details.component';
import { ListsComponent } from '../lists/lists.component';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    RouterModule,
    MemberListComponent,
    MemberDetailsComponent,
    ListsComponent
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
messageService = inject(MessageService);
container = 'Inbox';
pageNumber = 1;
pageSize = 5;


ngOnInit(): void {
  this.loadMessages();
}

loadMessages() {
  this.messageService.getMessages(this.pageNumber, this.pageSize, this.container);
}
pageChanged(event: any) {
  if (this.pageNumber !== event.page) {
    this.pageNumber = event.page;
    this.loadMessages();
  }
 }
}