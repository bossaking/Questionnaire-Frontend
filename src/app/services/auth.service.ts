import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {GlobalVariables} from "../share/GlobalVariables";
import {catchError, map} from "rxjs/operators";
import {Service} from "./service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Service{

  constructor(private http: HttpClient, protected toastr: ToastrService) {
    super(toastr);
  }


  register(data: any): Observable<any> {
    return this.http.post(GlobalVariables.appUrl + "register", data)
      .pipe(
        map(result => {
          this.showSuccess("Successfully sing up!");
            return result;
          }
        ),
        catchError((err) => {
          this.showError(err.error.message);
          console.log(err);
          return of(false);
        })
      );
  }

}
