import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Questionnaire} from "../Interfaces/Questionnaire";
import {QuestionnairesService} from "../services/questionnaires.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Lang} from "../Interfaces/Lang";
import {SingleQuestionComponent} from "../single-question/single-question.component";
import {Question} from "../Interfaces/Question";

@Component({
  selector: 'app-single-questionnaire-admin',
  templateUrl: './single-questionnaire-admin.component.html',
  styleUrls: ['./single-questionnaire-admin.component.css']
})
export class SingleQuestionnaireAdminComponent implements OnInit {

  loadingVisible: boolean = false;
  questionnaire: Questionnaire;

  updateButtonOptions: any = {
    text: "Update",
    type: "success",
    stylingMode: "outlined",
    onClick:() => {
      this.updateQuestionnaire();
    }
  };

  languages: Lang[] = [];
  selectLangOptions = {
    items: this.languages,
    searchEnabled: false,
    valueExpr: "Id",
    displayExpr: "Name"
  };

  minDate: number;

  questions: ComponentRef<SingleQuestionComponent>[] = [];

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef | any;
  @ViewChild('button') button: any;

  constructor(private questionnairesService: QuestionnairesService, private activatedRoute: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver) {
    this.languages.push(new class implements Lang {
      Id = "pl";
      Name = "Polski"
    }());
    this.languages.push(new class implements Lang {
      Id = "en";
      Name = "English"
    }());
    this.questionnaire = {} as Questionnaire;
    this.minDate = Date.now();
  }

  ngOnInit(): void {
    this.loadingVisible = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.questionnairesService.getByLink(params.link).subscribe((response : any) => {
        this.questionnaire = response.test;
        this.loadingVisible = false;
        for(let question of this.questionnaire.questions){
          this.addComponent(question);
        }
      })
    });
  }

  addComponent(question: Question | null) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SingleQuestionComponent);
    const component = this.container!.createComponent(componentFactory);
    if(question !== null)
    component.instance.setQuestion(question);
    component.instance.onRemoveEvent.subscribe(() => {
      this.removeComponent(component);
    });
    this.questions.push(component);
    setTimeout(() => {
      this.button.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }, 10 );
  }

  removeComponent(comp: ComponentRef<SingleQuestionComponent>) {
    const component = this.questions.find((component) => component === comp);
    const componentIndex = this.questions.indexOf(component!);

    if (componentIndex !== -1) {
      this.container!.remove(componentIndex);
      this.questions.splice(componentIndex, 1);
    }

  }

  updateQuestionnaire(){
  }

}
