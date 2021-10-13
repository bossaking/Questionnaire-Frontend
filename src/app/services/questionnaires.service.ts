import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {GlobalVariables} from "../share/GlobalVariables";
import {catchError, map} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {Service} from "./service";
import {QuestionnaireResponse} from "../Interfaces/QuestionnaireResponse";
import {Question} from "../Interfaces/Question";
import {Questionnaire} from "../Interfaces/Questionnaire";

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

  getMine(): Observable<TestsResponse>{
    return this.http.get<TestsResponse>(GlobalVariables.appUrl + "tests")
      .pipe(
        map((result: TestsResponse) => {
          return result;
        }),
        catchError((err) => {
          this.showError(err.error.message);
          return throwError(err);
        })
      );
  }

  getByLink(link: string): Observable<any>{
    return this.http.get(GlobalVariables.appUrl + "tests/show/" + link)
      .pipe(
        map((result: any) => {
          return result;
        }),
        catchError((err) => {
          this.showError(err.error.message);
          return throwError(err);
        })
      );
  }
}

export interface TestsResponse{
  tests: QuestionnaireResponse[];
}
