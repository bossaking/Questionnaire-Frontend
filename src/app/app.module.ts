import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NewQuestionnaireComponent} from './new-questionnaire/new-questionnaire.component';

import {DxButtonModule} from "devextreme-angular";
import {DxSelectBoxModule} from 'devextreme-angular';
import {DxFormModule} from 'devextreme-angular';
import {DxTextAreaModule} from "devextreme-angular";
import {DxSwitchModule} from 'devextreme-angular';
import {DxTextBoxModule} from "devextreme-angular";
import {DxRadioGroupModule} from "devextreme-angular";
import {DxiItemModule} from "devextreme-angular/ui/nested";
import {DxMenuModule} from "devextreme-angular";

import {FlexLayoutModule} from '@angular/flex-layout';
import {SingleQuestionComponent} from './single-question/single-question.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RegisterComponent } from './register/register.component';
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'new-questionnaire', component: NewQuestionnaireComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NewQuestionnaireComponent,
    SingleQuestionComponent,
    NavBarComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxFormModule,
    DxTextAreaModule,
    DxSwitchModule,
    DxTextBoxModule,
    DxRadioGroupModule,
    DxiItemModule,
    DxMenuModule,
    FlexLayoutModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SingleQuestionComponent]
})
export class AppModule {
}
