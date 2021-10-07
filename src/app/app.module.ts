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
import { DxTextBoxModule } from "devextreme-angular";
import { DxRadioGroupModule } from "devextreme-angular";

import {FlexLayoutModule} from '@angular/flex-layout';
import {SingleQuestionComponent} from './single-question/single-question.component';

@NgModule({
  declarations: [
    AppComponent,
    NewQuestionnaireComponent,
    SingleQuestionComponent
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
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
