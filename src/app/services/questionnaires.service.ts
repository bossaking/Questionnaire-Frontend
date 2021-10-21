import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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
    return this.http.post(GlobalVariables.appUrl + "admin/tests/store", data)
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

  getAll(): Observable<TestsResponse>{
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

  getMine(): Observable<TestsResponse>{
    return this.http.get<TestsResponse>(GlobalVariables.appUrl + "admin/tests")
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
    return this.http.get(GlobalVariables.appUrl + "admin/tests/show/" + link)
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

  getByLinkWithPassword(link: string, password:string): Observable<any>{
    const params = new HttpParams().append('password', password);
    return this.http.get(GlobalVariables.appUrl + "tests/show/" + link, {params: params})
      .pipe(
        map((result: any) => {
          return result;
        }),
        catchError((err) => {
          this.showError(err.error.errors.message);
          return of(err);
        })
      );
  }

  update(link: string, data: any): Observable<any> {
    return this.http.post(GlobalVariables.appUrl + "admin/tests/update/" + link, data)
      .pipe(
        map(() => {
            this.showSuccess("Questionnaire has been updated successfully!");
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

  submit(link: string, data: any): Observable<any> {
    return this.http.post(GlobalVariables.appUrl + "tests/submit/" + link, data)
      .pipe(
        map(() => {
            this.showSuccess("Questionnaire has been submitted successfully!");
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

export interface TestsResponse{
  tests: QuestionnaireResponse[];
}
