import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, Signal, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { environment } from '../../../environments/environment.development';
import { LoggedInUser } from '../../models/logged-in-user.model';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, NgOptimizedImage,
    MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule,
    MatDividerModule, MatListModule, MatTabsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  //#region injects and vars
  private accountService = inject(AccountService);

  photoUrl: string = environment.apiPhotoUrl;

  // loggedInUser$: Observable<LoggedInUser | null> | undefined; OLD
  loggedInUserSig: Signal<LoggedInUser | null> | undefined;

  linksWithAdmin: string[] = ['members', 'friends', 'messages', 'admin'];
  links: string[] = ['members', 'friends', 'messages'];
  //#endregion

  ngOnInit(): void {
    // this.loggedInUser$ = this.accountService.currentUser$; // OLD
    this.loggedInUserSig = this.accountService.loggedInUserSig;

    // console.log('THE LOGGED-IN USER:', this.loggedInUserSig()?.knownAs);
  }

  logout(): void {
    this.accountService.logout();
  }
}
