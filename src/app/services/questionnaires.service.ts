import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalVariables} from "../share/GlobalVariables";
import {map} from "rxjs/operators";
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";

@Injectable({
  providedIn: 'root'
})
export class QuestionnairesService {

  constructor(private http: HttpClient) {
  }


  store(data: any): Observable<any> {
    return this.http.post(GlobalVariables.appUrl + "tests/store", data)
      .pipe(
        (map((result: any) => {
            console.log(result);
          })
        ));
  }
}
