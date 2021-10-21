import {QuestionType} from "../Interfaces/QuestionType";
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import {Question} from "../Interfaces/Question";
import {Option} from "../Interfaces/Option";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'single-question',
  templateUrl: './single-question.component.html',
  styleUrls: ['./single-question.component.css']
})
export class SingleQuestionComponent implements OnInit {

  answerTextPlaceholder: string = "";
  question: Question;
  edited: boolean = false;
  editMode: boolean = false;
  @Output() onRemoveEvent = new EventEmitter();


  open: boolean = false;
  single: boolean = false;
  multiple: boolean = false;
  questionType: number = 0;

  answersOptions: any[] = [];

  questionTypes: QuestionType[] = [];

  deleteButtonOptions: any = {};



  selectTypeOptions = {};


  @ViewChild('template') template: any;
  @ViewChild('button') button: any;

  constructor(public translate: TranslateService) {

    let poland = localStorage.getItem('lang') === 'pl';
    if(poland){
      this.setupPolish();
    }else{
      this.setupEnglish();
    }

    this.getTranslations();


    this.question = {} as Question;
    this.question.options = [];
    this.question.is_required = false;
    this.answersOptions = this.getAnswersOptions(this.question.options);
  }

  getTranslations(){
    this.translate.get("Remove").subscribe((result: any) => {
      this.deleteButtonOptions = {
        text: result,
        type: "danger",
        icon: "trash",
        stylingMode: "outlined",
        onClick: () => {
          this.remove()
        }
      };
    });
    this.translate.get("Select").subscribe((result: any) => {
      this.selectTypeOptions = {
        placeholder: result,
        items: this.questionTypes,
        searchEnabled: false,
        valueExpr: "Id",
        displayExpr: "Name",
        onValueChanged: this.onValueChanged.bind(this)
      };
    });
    this.translate.get("Option_Placeholder").subscribe((result: any) => {
      this.answerTextPlaceholder = result;
    });
  }

  setupPolish(){
    this.questionTypes.push(new class implements QuestionType {
      Id = 1;
      Name = "Pytanie otwarte"
    }());
    this.questionTypes.push(new class implements QuestionType {
      Id = 2;
      Name = "Pytanie z jedną odpowiedzią"
    }());
    this.questionTypes.push(new class implements QuestionType {
      Id = 3;
      Name = "Pytanie z wieloma odpowiedziami"
    }());
  }

  setupEnglish(){
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

  getAnswersOptions(answers: any) {
    let options = [];
    for (let i = 0; i < answers.length; i++) {
      options.push(this.generateNewAnswersOptions(i));

    }
    return options;
  }

  ngOnInit(): void {

  }

  addNewAnswerOption() {
    this.question.options!.push({} as Option);
    this.answersOptions = this.getAnswersOptions(this.question.options);
    setTimeout(() => {
      this.button.nativeElement.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
    }, 10);
  }

  generateNewAnswersOptions(index: number) {
    return {
      placeholder: this.answerTextPlaceholder,
      buttons: [{
        name: "trash",
        location: "after",
        options: {
          stylingMode: "text",
          icon: "trash",
          onClick: () => {
            this.edited = true;
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
        }, 10);
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

  remove() {
    this.onRemoveEvent.emit();
  }

  setQuestion(quest: Question) {
    this.question = quest;
    switch (this.question.type) {
      case 1:
        this.open = true;
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
