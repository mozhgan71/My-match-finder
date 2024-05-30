import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const snack = inject(MatSnackBar);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err) {

        switch (err.status) {
          case 400:  // BadRequest
            if (err.error.errors) {
              const modelStateErrors: string[] = [];
              for (const key in err.error.errors) {
                modelStateErrors.push(err.error.errors[key]);
              }
              throw modelStateErrors;
            }
            else {
              snack.open(err.status.toString() + ': ' + err.error, 'Close', { horizontalPosition: 'center', verticalPosition: 'top', duration: 7000 });
            }
            break;
          case 401: // Unauthorized
            snack.open(err.error, 'Close', { horizontalPosition: 'center', verticalPosition: 'top', duration: 7000 });

            if (isPlatformBrowser(platformId)) // check platform only for SSR
              localStorage.clear();

            router.navigate(['account/login'])
            break;
          case 403: // Forbiden
            router.navigate(['/no-access']);
            break;
          case 404: // NotFound
            router.navigate(['/not-found']);
            break;
          case 500: // Server Erros
            const navigationExtras: NavigationExtras = { state: { error: err.error } };
            router.navigate(['/server-error'], navigationExtras);
            break;
          default: // All other errors
            snack.open('Something unexpected went wrong.', 'Close', { horizontalPosition: 'center', verticalPosition: 'top', duration: 7000 });
            console.log(err);
            break;
        }
      }
      throw err;
    })
  );
};
