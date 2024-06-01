import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MemberDetailsComponent } from '../member-details/member-details.component';
import { ListsComponent } from '../../lists/lists.component';
import { MessagesComponent } from '../../messages/messages.component';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    RouterModule,
    MemberDetailsComponent,
    ListsComponent,
    MessagesComponent
  ],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent {

}
