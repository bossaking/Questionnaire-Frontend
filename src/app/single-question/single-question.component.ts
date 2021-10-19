import {QuestionType} from "../Interfaces/QuestionType";
import {
  NgModule,
  Component,
  enableProdMode,
  AfterViewInit,
  OnInit,
  Output,
  EventEmitter,
  ViewChild, Input
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  DxFormModule
} from 'devextreme-angular';
import {Question} from "../Interfaces/Question";
import {Option} from "../Interfaces/Option";

@Component({
  selector: 'single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.css']
})
export class SingleQuestionComponent implements OnInit {

  question: Question;
  @Output() onRemoveEvent = new EventEmitter();


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

  @ViewChild('template') template: any;
  @ViewChild('button') button: any;
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
    this.question = {} as Question;
    this.question.options = [];
    this.question.is_required = false;
    this.answersOptions = this.getAnswersOptions(this.question.options);
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
    this.question.options!.push({} as Option);
    this.answersOptions = this.getAnswersOptions(this.question.options);
    setTimeout(() => {
      this.button.nativeElement.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
    }, 10 );
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
              this.question.options!.splice(index, 1);
              this.answersOptions = this.getAnswersOptions(this.question.options);
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

    this.question.options = [];

    switch (event.value) {
      case 1:
        this.open = true;
        setTimeout(() => {
          this.template.nativeElement.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
        }, 10 );
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

  setQuestion(quest:Question){
    this.question = quest;
    switch (this.question.type) {
      case 1:
        this.open = true;
        setTimeout(() => {
          this.template.nativeElement.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
        }, 10 );
        break;
      case 2:
        this.single = true;
        this.answersOptions = this.getAnswersOptions(this.question.options);
        break;
      case 3:
        this.multiple = true;
        this.answersOptions = this.getAnswersOptions(this.question.options);
        break;
    }
  }

}
