import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { environment } from '../../../../environments/environment.development';
import { LoggedInUser } from '../../../models/logged-in-user.model';
import { Member } from '../../../models/member.model';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [
    CommonModule, RouterModule, NgOptimizedImage,
    MatCardModule, MatIconModule
  ],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent {
  @Input('memberInput') member: Member | undefined;
  // @Input('isAliveInput') isAlive: boolean | undefined;
  @Input('loggedIn') loggedIn: LoggedInUser | undefined;

  // apiPhotoUrl = environment.apiPhotoUrl;

  apiPhotoUrl = environment.apiPhotoUrl;
}
