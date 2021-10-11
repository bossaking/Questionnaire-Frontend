import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NewQuestionnaireComponent} from './new-questionnaire/new-questionnaire.component';

import {DxButtonModule, DxLoadIndicatorModule} from "devextreme-angular";
import {DxSelectBoxModule} from 'devextreme-angular';
import {DxFormModule} from 'devextreme-angular';
import {DxTextAreaModule} from "devextreme-angular";
import {DxSwitchModule} from 'devextreme-angular';
import {DxTextBoxModule} from "devextreme-angular";
import {DxRadioGroupModule} from "devextreme-angular";
import {DxiItemModule} from "devextreme-angular/ui/nested";
import {DxMenuModule} from "devextreme-angular";
import {DxToastModule} from "devextreme-angular";

import {FlexLayoutModule} from '@angular/flex-layout';
import {SingleQuestionComponent} from './single-question/single-question.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RegisterComponent } from './register/register.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'new-questionnaire', component: NewQuestionnaireComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NewQuestionnaireComponent,
    SingleQuestionComponent,
    NavBarComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    DxToastModule,
    FlexLayoutModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1000,
    }),
    RouterModule.forRoot(
      appRoutes
    ),
    DxLoadIndicatorModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
  entryComponents: [SingleQuestionComponent]
})
export class AppModule {
}
