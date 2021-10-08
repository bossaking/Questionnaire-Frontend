import {
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

@Component({
  selector: 'app-new-questionnaire',
  templateUrl: './new-questionnaire.component.html',
  styleUrls: ['./new-questionnaire.component.css']
})
export class NewQuestionnaireComponent implements OnInit {

  questionTypes = [];
  disabled: boolean = true;

  singleQuestionComponents: any[] = [];
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef | undefined;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngOnInit(): void {
  }

  addComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SingleQuestionComponent);
    const component = this.container!.createComponent(componentFactory);
    component.instance.onRemoveEvent.subscribe(() => {
      this.removeComponent(component);
    });
    // @ts-ignore
    this.questionTypes.push(component);
  }

  removeComponent(comp: ComponentRef<SingleQuestionComponent>){
    // @ts-ignore
    const component = this.questionTypes.find((component) => component === comp);
    const componentIndex = this.questionTypes.indexOf(component!);

    if (componentIndex !== -1) {
      this.container!.remove(componentIndex);
      this.questionTypes.splice(componentIndex, 1);
    }
  }

}
