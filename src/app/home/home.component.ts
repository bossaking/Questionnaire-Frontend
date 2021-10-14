import { Component, OnInit } from '@angular/core';
import {QuestionnaireResponse} from "../Interfaces/QuestionnaireResponse";
import {QuestionnairesService, TestsResponse} from "../services/questionnaires.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loadingVisible:boolean = true;

  questionnaires: QuestionnaireResponse[] = [];

  actualDate:number;

  constructor(private questionnairesService: QuestionnairesService) {
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

}
