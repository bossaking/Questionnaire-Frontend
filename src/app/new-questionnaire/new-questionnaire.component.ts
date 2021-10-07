import { Component, OnInit } from '@angular/core';
import {QuestionType} from "../Interfaces/QuestionType";

@Component({
  selector: 'app-new-questionnaire',
  templateUrl: './new-questionnaire.component.html',
  styleUrls: ['./new-questionnaire.component.css']
})
export class NewQuestionnaireComponent implements OnInit {

  questionTypes: QuestionType[] = [];
  disabled: boolean = true;

  constructor() {

  }

  ngOnInit(): void {
  }

  onValueChanged(event: any){
    this.disabled = false;
  }

}
