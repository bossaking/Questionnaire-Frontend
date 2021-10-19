import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Questionnaire} from "../Interfaces/Questionnaire";
import {QuestionnairesService} from "../services/questionnaires.service";
import {Question} from "../Interfaces/Question";
import {SingleQuestionComponent} from "../single-question/single-question.component";
import {SingleAnswerComponent} from "../single-answer/single-answer.component";
import {QuestionnaireSubmitRequest} from "../Interfaces/QuestionnaireSubmitRequest";
import {AnswerWithText} from "../Interfaces/AnswerWithText";
import {AnswerWithoutText} from "../Interfaces/AnswerWithoutText";

@Component({
  selector: 'app-single-questionnaire',
  templateUrl: './single-questionnaire.component.html',
  styleUrls: ['./single-questionnaire.component.css']
})
export class SingleQuestionnaireComponent implements OnInit {

  loadingVisible: boolean = false;
  questionnaire: Questionnaire;
  questions: ComponentRef<SingleAnswerComponent>[] = [];

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef | any;
  constructor(private activatedRoute: ActivatedRoute, private questionnairesService: QuestionnairesService, private componentFactoryResolver: ComponentFactoryResolver, private router: Router) {
    this.questionnaire = {} as Questionnaire;
  }

  ngOnInit(): void {
    this.loadingVisible = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.activatedRoute.queryParams.subscribe((query: Params) => {
        this.questionnairesService.getByLinkWithPassword(params.link, query.password).subscribe((response : any) => {
          this.questionnaire = response.test;
          this.questionnaire.password = query.password;
          console.log(this.questionnaire);
          for(let question of this.questionnaire.questions){
            this.addComponent(question);
          }
          this.loadingVisible = false;
        })
      });
    });
  }

  addComponent(question: Question | null) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SingleAnswerComponent);
    const component = this.container!.createComponent(componentFactory);
    if(question !== null)
      component.instance.setQuestion(question);
    this.questions.push(component);
  }

  saveAnswers(){
    this.loadingVisible = true;
    let questionnaireSubmit = {} as QuestionnaireSubmitRequest;
    if(this.questionnaire.password === undefined){
      questionnaireSubmit.password = null;
    }else{
      questionnaireSubmit.password = this.questionnaire.password;
    }
    questionnaireSubmit.answers = [];
    for(let question of this.questions){
      let questionType = question.instance.question.type;
      if(questionType === 1){
        let answerWithText = {} as AnswerWithText;
        if(question.instance.answer.text !== undefined && question.instance.answer.text !== ""){
          // @ts-ignore
          answerWithText.option_id = question.instance.question.options[0].id;
          answerWithText.text = question.instance.answer.text;
          // @ts-ignore
          questionnaireSubmit.answers.push(answerWithText);
        }
      }else{
        if(questionType === 2){
          if(question.instance.answer.singleOption !== undefined){
            let answerWithoutText = {} as AnswerWithoutText;
            answerWithoutText.option_id = question.instance.answer.singleOption.id;
            // @ts-ignore
            questionnaireSubmit.answers.push(answerWithoutText);
          }

        }else{
          for(let option of question.instance.answer.multipleOptions){
            let answerWithoutText = {} as AnswerWithoutText;
            answerWithoutText.option_id = option.id;
            // @ts-ignore
            questionnaireSubmit.answers.push(answerWithoutText);
          }
        }
      }
    }
    this.questionnairesService.submit(this.questionnaire.link, questionnaireSubmit).subscribe(result => {
      this.loadingVisible = false;
      if(result){
        this.router.navigate(['home']);
      }
    });
  }
}
