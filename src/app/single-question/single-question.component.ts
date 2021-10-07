import { Component, OnInit } from '@angular/core';
import {QuestionType} from "../Interfaces/QuestionType";

@Component({
  selector: 'single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.css']
})
export class SingleQuestionComponent implements OnInit {

  open:boolean = false;
  single:boolean = false;

  questionTypes: QuestionType[] = [];

  singleOptions:any = [
    { value: "Option 1" }
  ];

  deleteButtonOptions: any = {
    text: "Remove",
    type: "danger",
    icon: "trash",
    stylingMode: "outlined"
  };

  selectTypeOptions = {
    items: this.questionTypes,
    searchEnabled: false,
    valueExpr: "Id",
    displayExpr: "Name",
    onValueChanged: this.onValueChanged.bind(this)
  }

  constructor() {
    this.questionTypes.push(new class implements QuestionType {
      Id = 1;
      Name = "Open question"
    }());
    this.questionTypes.push(new class implements QuestionType {
      Id = 2;
      Name = "Question with one answer"
    }());
    this.questionTypes.push(new class implements QuestionType {
      Id = 3;
      Name = "Question with many answers"
    }());
  }

  ngOnInit(): void {
  }

  onValueChanged(event: any){
    this.single = false;
    this.open = false;

    switch (event.value){
      case 1:
        this.open = true;
        break;
      case 2:
        this.single = true;
        break;
    }
  }

}
