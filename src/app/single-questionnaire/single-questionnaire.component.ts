import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Questionnaire} from "../Interfaces/Questionnaire";
import {QuestionnairesService} from "../services/questionnaires.service";
import {Question} from "../Interfaces/Question";
import {SingleQuestionComponent} from "../single-question/single-question.component";
import {SingleAnswerComponent} from "../single-answer/single-answer.component";

@Component({
  selector: 'app-single-questionnaire',
  templateUrl: './single-questionnaire.component.html',
  styleUrls: ['./single-questionnaire.component.css']
})
export class SingleQuestionnaireComponent implements OnInit {

  loadingVisible: boolean = false;
  questionnaire: Questionnaire;
  questions: ComponentRef<SingleQuestionComponent>[] = [];

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef | any;
  constructor(private activatedRoute: ActivatedRoute, private questionnairesService: QuestionnairesService, private componentFactoryResolver: ComponentFactoryResolver) {
    this.questionnaire = {} as Questionnaire;
  }

  ngOnInit(): void {
    this.loadingVisible = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.activatedRoute.queryParams.subscribe((query: Params) => {
        this.questionnairesService.getByLinkWithPassword(params.link, query.password).subscribe((response : any) => {
          this.questionnaire = response.test;
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
    console.log(this.questions);
  }
}
