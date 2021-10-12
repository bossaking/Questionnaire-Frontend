import { Component, OnInit } from '@angular/core';
import {QuestionnairesService, TestsResponse} from "../services/questionnaires.service";
import {QuestionnaireResponse} from "../Interfaces/QuestionnaireResponse";

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.css']
})
export class QuestionnairesComponent implements OnInit {

  loadingVisible:boolean = true;

  questionnaires: QuestionnaireResponse[] = [];

  actualDate:number;

  constructor(private questionnairesService: QuestionnairesService) {
    this.actualDate = Date.now();
    console.log(this.actualDate);
  }

  ngOnInit(): void {
    this.questionnairesService.getMine().subscribe((result: TestsResponse) => {
      this.loadingVisible = false;
      console.log(result);
      this.questionnaires = result.tests;
      for(let questionnaire of this.questionnaires){
        questionnaire.expiration_date = Date.parse(questionnaire.expiration_at);
      }
    });
  }

}
