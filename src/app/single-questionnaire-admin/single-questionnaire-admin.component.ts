import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Questionnaire} from "../Interfaces/Questionnaire";
import {QuestionnairesService} from "../services/questionnaires.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Lang} from "../Interfaces/Lang";
import {SingleQuestionComponent} from "../single-question/single-question.component";
import {Question} from "../Interfaces/Question";
import {UpdateQuestionnaireRequest} from "../Interfaces/UpdateQuestionnaireRequest";
import {NewQuestionRequest} from "../Interfaces/NewQuestionRequest";
import {Option} from "../Interfaces/Option";
import {formatDate} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-single-questionnaire-admin',
  templateUrl: './single-questionnaire-admin.component.html',
  styleUrls: ['./single-questionnaire-admin.component.css']
})
export class SingleQuestionnaireAdminComponent implements OnInit {

  loadingVisible: boolean = false;
  questionnaire: Questionnaire;

  updateButtonOptions: any = {};

  languages: Lang[] = [];
  selectLangOptions = {};

  minDate: number;

  questions: ComponentRef<SingleQuestionComponent>[] = [];

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef | any;
  @ViewChild('button') button: any;

  constructor(private questionnairesService: QuestionnairesService, private activatedRoute: ActivatedRoute, private componentFactoryResolver: ComponentFactoryResolver, private router: Router, public translate: TranslateService) {
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
    this.getTranslations();
  }

  ngOnInit(): void {
    this.loadingVisible = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.questionnairesService.getByLink(params.link).subscribe((response : any) => {
        this.questionnaire = response.test;
        this.loadingVisible = false;
        for(let question of this.questionnaire.questions){
          this.init(question);
        }
        for(let question of this.questions){
          question.instance.editMode = true;
        }
      })
    });
  }

  getTranslations(){
    this.translate.get('Save').subscribe((save: string) => {
      this.updateButtonOptions = {
        text: save,
        type: "success",
        stylingMode: "outlined",
        onClick:() => {
          this.updateQuestionnaire();
        }
      };
    });
    this.translate.get('Select').subscribe((select: string) => {
      this.selectLangOptions = {
        placeholder: select,
        items: this.languages,
        searchEnabled: false,
        valueExpr: "Id",
        displayExpr: "Name"
      };
    });
  }

  init(question: Question | null){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SingleQuestionComponent);
    const component = this.container!.createComponent(componentFactory);
    if(question !== null)
      component.instance.setQuestion(question);
    component.instance.onRemoveEvent.subscribe(() => {
      this.removeComponent(component);
    });
    this.questions.push(component);
  }

  addComponent(question: Question | null) {
    this.init(question);
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
    this.loadingVisible = true;
    let request = {} as UpdateQuestionnaireRequest;
    request.lang = this.questionnaire.lang;
    request.expiration_at = formatDate(this.questionnaire.expiration_at, 'yyyy-MM-dd HH:mm:ss', 'pl');
    request.description = this.questionnaire.description;
    request.name = this.questionnaire.name;
    request.is_active = this.questionnaire.is_active;
    request.password = this.questionnaire.password;
    request.questions = [];

    for(let question of this.questions){

      if(question.instance.question.id !== undefined){
        if(question.instance.question.options?.find(o => o.id === null || o.id === undefined) !== undefined || question.instance.edited){
          let newQuestion = {} as NewQuestionRequest;
          newQuestion.name = question.instance.question.name;
          newQuestion.type = question.instance.question.type;
          newQuestion.description = question.instance.question.description;
          newQuestion.is_required = question.instance.question.is_required;
          if(newQuestion.type === 1){
            newQuestion.options = null;
          }else{
            newQuestion.options = [];
            // @ts-ignore
            for(let option of question.instance.question.options){
              let newOption = {} as Option;
              newOption.description = option.description;
              newQuestion.options.push(newOption);
            }
          }
          // @ts-ignore
          request.questions.push(newQuestion);
        }else{
          // @ts-ignore
          request.questions.push(question.instance.question);
        }
      }else{
        let newQuestion = {} as NewQuestionRequest;
        newQuestion.name = question.instance.question.name;
        newQuestion.type = question.instance.question.type;
        newQuestion.description = question.instance.question.description;
        newQuestion.is_required = question.instance.question.is_required;
        if(newQuestion.type === 1){
          newQuestion.options = null;
        }else{
          newQuestion.options = question.instance.question.options;
        }
        // @ts-ignore
        request.questions.push(newQuestion);
      }
    }
    this.questionnairesService.update(this.questionnaire.link, request).subscribe(result => {
      this.loadingVisible = false;
      if(result){
        this.router.navigate(['mine-questionnaires']);
      }
    });
  }

}
