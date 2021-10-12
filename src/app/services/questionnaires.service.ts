import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {GlobalVariables} from "../share/GlobalVariables";
import {catchError, map} from "rxjs/operators";
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";
import {ToastrService} from "ngx-toastr";
import {Service} from "./service";

@Injectable({
  providedIn: 'root'
})
export class QuestionnairesService extends Service {

  constructor(private http: HttpClient, protected toastr: ToastrService) {
    super(toastr);
  }


  store(data: any): Observable<any> {
    return this.http.post(GlobalVariables.appUrl + "tests/store", data)
      .pipe(
        map(() => {
            this.showSuccess("Questionnaire has been added successfully!");
            return of(true);
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
