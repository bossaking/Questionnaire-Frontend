import {QuestionType} from "../Interfaces/QuestionType";
import {NgModule, Component, enableProdMode, AfterViewInit, OnInit, Output, EventEmitter} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  DxFormModule
} from 'devextreme-angular';
import {Question} from "../Interfaces/Question";

@Component({
  selector: 'single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.css']
})
export class SingleQuestionComponent implements OnInit {

  @Output() onRemoveEvent = new EventEmitter();
  
  question: Question = {
    Answers: []
  };

  open: boolean = false;
  single: boolean = false;
  multiple: boolean = false;
  questionType: number = 0;

  answersOptions: any[] = [];

  questionTypes: QuestionType[] = [];
  // answers: string[] = [];
  singleOptions: any = [
    {value: "Option 1"}
  ];

  deleteButtonOptions: any = {
    text: "Remove",
    type: "danger",
    icon: "trash",
    stylingMode: "outlined",
    onClick: () => {
      this.remove()
    }
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

    this.answersOptions = this.getAnswersOptions(this.question.Answers);
  }

  getAnswersOptions(answers: any){
    let options = [];
    for(let i = 0; i < answers.length; i++){
      options.push(this.generateNewAnswersOptions(i));
    }
    return options;
  }

  ngOnInit(): void {

  }

  addNewAnswerOption(){
    this.question.Answers!.push("");
    this.answersOptions = this.getAnswersOptions(this.question.Answers);
  }

  generateNewAnswersOptions(index: number) {
      return{
        placeholder: "Answer text",
        buttons: [{
          name: "trash",
          location: "after",
          options: {
            stylingMode: "text",
            icon: "trash",
            onClick: () => {
              this.question.Answers!.splice(index, 1);
              this.answersOptions = this.getAnswersOptions(this.question.Answers);
            }
          }
        }]
      }
  }

  onValueChanged(event: any) {
    this.single = false;
    this.multiple = false;
    this.open = false;
    this.questionType = event.value;

    this.question.Answers = [];

    switch (event.value) {
      case 1:
        this.open = true;
        break;
      case 2:
        this.single = true;
        this.addNewAnswerOption();
        break;
      case 3:
        this.multiple = true;
        this.addNewAnswerOption();
        break;
    }
  }

  remove(){
    this.onRemoveEvent.emit();
  }

}
