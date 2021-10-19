import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Question} from "../Interfaces/Question";
import {QuestionType} from "../Interfaces/QuestionType";
import {Option} from "../Interfaces/Option";
import {Answer} from "../Interfaces/Answer";

@Component({
  selector: 'app-single-answer',
  templateUrl: './single-answer.component.html',
  styleUrls: ['./single-answer.component.css']
})
export class SingleAnswerComponent implements OnInit {

  question: Question = {} as Question;
  answer: Answer = {} as Answer;

  open: boolean = false;
  single: boolean = false;
  multiple: boolean = false;
  questionType: number = 0;

  answersOptions: any[] = [];

  questionTypes: QuestionType[] = [];

  singleOptions: any;
  multipleOptions: any;

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
    // this.answer = {} as Answer;
    //this.question = {} as Question;\
    this.answer.multipleOptions = [];
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

  handleSingleChange(e: any){
    this.answer.singleOption = e.value;
  }

  handleMultipleChange(e: any){
    console.log(this.answer);
    if(e.value){
      this.answer.multipleOptions.push(this.question.options?.find(o => o.description === e.element.innerText)!);
    }else{
      this.answer.multipleOptions.splice(this.answer.multipleOptions.indexOf(this.question.options?.find(o => o.description === e.element.innerText)!), 1);
    }
  }

  setQuestion(quest:Question){
    this.question = quest;
    switch (this.question.type) {
      case 1:
        this.open = true;
        break;
      case 2:
        this.single = true;
        this.singleOptions = {
          items: this.question.options,
          displayExpr: "description",
          onValueChanged: (event: any) => {
            this.handleSingleChange(event);
          }
        };
        this.answersOptions = this.getAnswersOptions(this.question.options);
        break;
      case 3:
        this.multiple = true;
        this.answersOptions = this.getAnswersOptions(this.question.options);
        break;
    }
  }

}
