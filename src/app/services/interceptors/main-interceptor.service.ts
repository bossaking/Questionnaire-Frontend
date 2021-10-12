import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MainInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Auth interception In Progress"); // Interception Stage
    const token: string | null = localStorage.getItem('token'); // This retrieves a token from local storage
    const lang: string = localStorage.getItem('lang') ?? 'pl';
    req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});// This clones HttpRequest and Authorization header with Bearer token added
    req = req.clone({headers: req.headers.set('Content-Language', lang)});

    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Catching Error Stage
          if (error && error.status === 401) {
            console.log("ERROR 401 UNAUTHORIZED") // in case of an error response the error message is displayed
          }
          const err = error.error.message || error.statusText;
          return throwError(error); // any further errors are returned to frontend
        })
      );
  }
}
