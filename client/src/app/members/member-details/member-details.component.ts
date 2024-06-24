import { Component } from '@angular/core';
import { MemberListComponent } from '../member-list/member-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [
    MemberListComponent,
    RouterModule,

  ],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent {

}
