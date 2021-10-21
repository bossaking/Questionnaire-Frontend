import {Component, OnInit} from '@angular/core';
import {QuestionnaireResponse} from "../Interfaces/QuestionnaireResponse";
import {QuestionnairesService, TestsResponse} from "../services/questionnaires.service";
import {MatDialog} from "@angular/material/dialog";
import {PasswordDialogComponent} from "../password-dialog/password-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loadingVisible: boolean = true;

  questionnaires: QuestionnaireResponse[] = [];

  actualDate: number;

  password: string = "";

  constructor(private questionnairesService: QuestionnairesService, private router: Router) {
    this.actualDate = Date.now();
  }

  ngOnInit(): void {
    this.questionnairesService.getAll().subscribe((result: TestsResponse) => {
      this.loadingVisible = false;
      this.questionnaires = result.tests;
      for (let questionnaire of this.questionnaires) {
        questionnaire.expiration_date = Date.parse(questionnaire.expiration_at);
      }
    });
  }

  openQuestionnaire(questionnaire: QuestionnaireResponse) {
    if (questionnaire.password !== null) {
      this.router.navigate(['/questionnaire', questionnaire.link], {queryParams: {password: "required"}});
    } else {
      this.router.navigate(['/questionnaire', questionnaire.link]);
    }
  }

}
