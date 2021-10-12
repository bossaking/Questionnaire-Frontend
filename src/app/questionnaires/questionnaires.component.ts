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

  constructor(private questionnairesService: QuestionnairesService) { }

  ngOnInit(): void {
    this.questionnairesService.getMine().subscribe((result: TestsResponse) => {
      this.loadingVisible = false;
      console.log(result);
      this.questionnaires = result.tests;
    });
  }

}
