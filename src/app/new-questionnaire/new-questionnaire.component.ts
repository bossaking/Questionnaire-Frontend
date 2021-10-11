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

@Component({
  selector: 'app-new-questionnaire',
  templateUrl: './new-questionnaire.component.html',
  styleUrls: ['./new-questionnaire.component.css']
})
export class NewQuestionnaireComponent implements AfterViewInit {

  createButtonOptions: any = {
    text: "Create",
    type: "success",
    icon: "check",
    stylingMode: "outlined"
  };

  minDate: number;

  questions: ComponentRef<SingleQuestionComponent>[] = [];

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef | undefined;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.minDate = Date.now();
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
  }

  removeComponent(comp: ComponentRef<SingleQuestionComponent>) {
    const component = this.questions.find((component) => component === comp);
    const componentIndex = this.questions.indexOf(component!);

    if (componentIndex !== -1) {
      this.container!.remove(componentIndex);
      this.questions.splice(componentIndex, 1);
    }

  }

}
