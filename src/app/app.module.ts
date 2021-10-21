import {LOCALE_ID, NgModule} from '@angular/core';
import '@angular/common/locales/global/pl';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NewQuestionnaireComponent} from './new-questionnaire/new-questionnaire.component';

import {DxBoxModule, DxButtonModule, DxListModule, DxLoadIndicatorModule, DxLoadPanelModule} from "devextreme-angular";
import {DxSelectBoxModule} from 'devextreme-angular';
import {DxFormModule} from 'devextreme-angular';
import {DxTextAreaModule} from "devextreme-angular";
import {DxSwitchModule} from 'devextreme-angular';
import {DxTextBoxModule} from "devextreme-angular";
import {DxRadioGroupModule} from "devextreme-angular";
import {DxiItemModule} from "devextreme-angular/ui/nested";
import {DxMenuModule} from "devextreme-angular";
import {DxToastModule} from "devextreme-angular";
import {DxScrollViewModule} from "devextreme-angular";
import {DxCheckBoxModule} from "devextreme-angular";
import { DxPieChartModule } from 'devextreme-angular';

import {FlexLayoutModule} from '@angular/flex-layout';
import {SingleQuestionComponent} from './single-question/single-question.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {RegisterComponent} from './register/register.component';
import {RouterModule, Routes} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {MainInterceptorService} from "./services/interceptors/main-interceptor.service";
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { SingleQuestionnaireAdminComponent } from './single-questionnaire-admin/single-questionnaire-admin.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import {MatDialogModule} from '@angular/material/dialog';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import { SingleQuestionnaireComponent } from './single-questionnaire/single-questionnaire.component';
import { SingleAnswerComponent } from './single-answer/single-answer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {QRCodeModule} from "angular2-qrcode";
import { DetailsComponent } from './details/details.component';

const appRoutes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'new-questionnaire', component: NewQuestionnaireComponent},
  {
    path: '', component: HomeComponent, children: [{
      path: 'home',
      component: HomeComponent
    }]
  },
  {path: 'mine-questionnaires', component: QuestionnairesComponent},
  {path: 'show-questionnaire/:link', component: SingleQuestionnaireAdminComponent},
  {path: 'questionnaire/:link', component: SingleQuestionnaireComponent},
  {path: 'details/:link', component: DetailsComponent},
  {path: 'not-found', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NewQuestionnaireComponent,
    SingleQuestionComponent,
    NavBarComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    QuestionnairesComponent,
    SingleQuestionnaireAdminComponent,
    PasswordDialogComponent,
    SingleQuestionnaireComponent,
    SingleAnswerComponent,
    PageNotFoundComponent,
    DetailsComponent
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
    DxCheckBoxModule,
    DxScrollViewModule,
    DxPieChartModule,
    FlexLayoutModule,
    HttpClientModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 1000,
    }),
    RouterModule.forRoot(
      appRoutes
    ),
    DxLoadIndicatorModule,
    DxLoadPanelModule,
    DxBoxModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    QRCodeModule,
    DxListModule
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS, useClass: MainInterceptorService, multi: true
    },
    {
      provide: LOCALE_ID, useValue: 'pl'
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [SingleQuestionComponent]
})
export class AppModule {
}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
