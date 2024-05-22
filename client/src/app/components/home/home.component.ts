import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AccountService } from '../../services/account.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userService = inject(UserService);
  accountService = inject(AccountService);

  allUsers: User[] | null | undefined;
  allUsers$: Observable<User[] | null> | undefined;
  // subscription: Subscription | undefined;

  // ngOnDestroy(): void {
  //   this.subscription?.unsubscribe();

  //   console.log('This is OnDestroy');
  // }
}
