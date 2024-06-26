import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AutoFocusDirective } from '../../../directives/auto-focus.directive';
import { LoginUser } from '../../../models/login-user.model';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';
import { LoggedInUser } from '../../../models/logged-in-user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSnackBarModule, AutoFocusDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  accountService = inject(AccountService);
  fb = inject(FormBuilder);
  private router = inject(Router);

  wrongUsernameOrPassword: string | undefined;

  //#region FormGroup
  loginFg: FormGroup = this.fb.group({
    emailCtrl: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$/)]],
    passwordCtrl: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]]
  })

  get EmailCtrl(): FormControl {
    return this.loginFg.get('emailCtrl') as FormControl;
  }

  get PasswordCtrl(): FormControl {
    return this.loginFg.get('passwordCtrl') as FormControl;
  }
  //#endregion FormGroup

  //#region Methods
  login(): void {
    let loginUser: LoginUser = {
      email: this.EmailCtrl.value,
      password: this.PasswordCtrl.value
    }

    //return: Observable<LoggedInUser>
    this.accountService.loginUser(loginUser).subscribe({
      next: (LoggedInUser: LoggedInUser | null) => {
        console.log(LoggedInUser);
      },
      // show Wrong username or password error.
      error: err => {
        this.wrongUsernameOrPassword = err.error;
      }
    })
  }

  getState(): void {
    console.log(this.PasswordCtrl);
  }
  //#endregion Methods
}
