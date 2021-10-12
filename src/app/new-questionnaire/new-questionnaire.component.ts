import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {QuestionType} from "../Interfaces/QuestionType";
import {SingleQuestionComponent} from "../single-question/single-question.component";
import {Lang} from "../Interfaces/Lang";
import {Questionnaire} from "../Interfaces/Questionnaire";
import {formatDate} from "@angular/common";
import {QuestionnairesService} from "../services/questionnaires.service";

@Component({
  selector: 'app-new-questionnaire',
  templateUrl: './new-questionnaire.component.html',
  styleUrls: ['./new-questionnaire.component.css']
})
export class NewQuestionnaireComponent implements AfterViewInit {

  questionnaire: Questionnaire;

  createButtonOptions: any = {
    text: "Create",
    type: "success",
    icon: "check",
    stylingMode: "outlined",
    onClick:() => {
      this.createNewQuestionnaire();
    }
  };

  minDate: number;

  languages: Lang[] = [];
  selectLangOptions = {
    items: this.languages,
    searchEnabled: false,
    valueExpr: "Id",
    displayExpr: "Name"
  };

  questions: ComponentRef<SingleQuestionComponent>[] = [];

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef | any;
  @ViewChild('button') button: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private questionnairesService: QuestionnairesService) {
    this.languages.push(new class implements Lang {
      Id = "pl";
      Name = "Polski"
    }());
    this.languages.push(new class implements Lang {
      Id = "en";
      Name = "English"
    }());
    this.minDate = Date.now();
    this.questionnaire = {} as Questionnaire;
  }


  ngAfterViewInit() {
  }

  addComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SingleQuestionComponent);
    const component = this.container!.createComponent(componentFactory);
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

  createNewQuestionnaire(){
    this.questionnaire.questions = [];
    this.questionnaire.expiration_at =  formatDate(this.questionnaire.expiration_at, 'yyyy-MM-dd HH:mm:ss', 'pl');
    this.questionnaire.is_active = JSON.parse(String(this.questionnaire.is_active));
    for(let i = 0; i < this.questions.length; i++){
      if(this.questions[i].instance.question.options?.length == 0)
        this.questions[i].instance.question.options = null;
      this.questionnaire.questions.push(this.questions[i].instance.question);
    }
    console.log(this.questionnaire);
    this.questionnairesService.store(this.questionnaire).subscribe(result => {
      console.log(result);
    });
    //console.log(this.questionnaire);
  }

}
