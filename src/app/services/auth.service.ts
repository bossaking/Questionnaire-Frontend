import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {GlobalVariables} from "../share/GlobalVariables";
import {catchError, map} from "rxjs/operators";
import {Service} from "./service";
import {ToastrService} from "ngx-toastr";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Service {

  constructor(private http: HttpClient, protected toastr: ToastrService) {
    super(toastr);
  }


  register(data: any): Observable<any> {
    return this.http.post(GlobalVariables.appUrl + "register", data)
      .pipe(
        map((result: any) => {
            this.showSuccess("Successfully singed up!");
            this.saveToken(result.token);
            return of(true);
          }
        ),
        catchError((err) => {
          this.showError(err.error.errors[Object.keys(err.error.errors)[0]]);
          console.log(err);
          return of(false);
        })
      );
  }

  login(data: any): Observable<any> {
    return this.http.post(GlobalVariables.appUrl + "login", data)
      .pipe(
        map((result: any) => {
            this.showSuccess("Successfully singed in!");
            this.saveToken(result.token);
            return of(true);
          }
        ),
        catchError((err) => {
          this.showError(err.error.errors[Object.keys(err.error.errors)[0]]);
          console.log(err);
          return of(false);
        })
      );
  }

  logout() {
    this.removeToken();
    this.http.post(GlobalVariables.appUrl + "/logout", null).pipe(
      (map(result => {
        console.log(result);
      }))
    );
    window.location.reload();
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    let helper = new JwtHelperService();
    return !helper.isTokenExpired(localStorage.getItem('token')!);
  }
}
