import { Component, OnInit } from '@angular/core';
import {QuestionnaireResponse} from "../Interfaces/QuestionnaireResponse";
import {QuestionnairesService, TestsResponse} from "../services/questionnaires.service";
import {MatDialog} from "@angular/material/dialog";
import {PasswordDialogComponent} from "../password-dialog/password-dialog.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loadingVisible:boolean = true;

  questionnaires: QuestionnaireResponse[] = [];

  actualDate:number;

  password: string = "";

  constructor(private questionnairesService: QuestionnairesService, public dialog: MatDialog) {
    this.actualDate = Date.now();
  }

  ngOnInit(): void {
    this.questionnairesService.getAll().subscribe((result: TestsResponse) => {
      this.loadingVisible = false;
      this.questionnaires = result.tests;
      console.log(this.questionnaires);
      for(let questionnaire of this.questionnaires){
        questionnaire.expiration_date = Date.parse(questionnaire.expiration_at);
      }
    });
  }

  openQuestionnaire(questionnaire: QuestionnaireResponse){
    if(questionnaire.password !== null){
      const dialogRef = this.dialog.open(PasswordDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if(result === undefined) return;
        this.password = result;
        this.loadingVisible = true;
        this.questionnairesService.getByLinkWithPassword(questionnaire.link, this.password).subscribe(result => {
          this.loadingVisible = false;
          if(result){
            console.log(result);
          }
        });
      });
    }
  }

}
