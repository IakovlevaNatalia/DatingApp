import { Component } from '@angular/core';
import { MemberListComponent } from '../member-list/member-list.component';
import { RouterModule } from '@angular/router';
import { ListsComponent } from '../../lists/lists.component';
import { MessagesComponent } from '../../messages/messages.component';

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [
    MemberListComponent,
    RouterModule,
    ListsComponent,
    MessagesComponent

  ],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent {

}
