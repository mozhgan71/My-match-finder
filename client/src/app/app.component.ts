import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, FooterComponent,
    NavbarComponent, NgxSpinnerModule]
})
export class AppComponent implements OnInit {
  private accountService = inject(AccountService);
  private platformId = inject(PLATFORM_ID); // used to test if we are in the client(browser) or server. We must be on the client to access localStorage!

  ngOnInit(): void {
    // console.log('PlatformId in OnInit:', this.platformId);
    this.initUserOnPageRefresh();
  }

  initUserOnPageRefresh(): void {
    if (isPlatformBrowser(this.platformId)) {
      const loggedInUserStr = localStorage.getItem('loggedInUser');

      if (loggedInUserStr) {
        // First, check if user's token is not expired.
        this.accountService.authorizeLoggedInUser();

        // Then, set the authorized logged-in user
        this.accountService.setCurrentUser(JSON.parse(loggedInUserStr))
      }
    }
  }
}
