import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Questionnaire} from "../Interfaces/Questionnaire";
import {QuestionnairesService} from "../services/questionnaires.service";

@Component({
  selector: 'app-single-questionnaire',
  templateUrl: './single-questionnaire.component.html',
  styleUrls: ['./single-questionnaire.component.css']
})
export class SingleQuestionnaireComponent implements OnInit {

  loadingVisible: boolean = false;
  questionnaire: Questionnaire;

  constructor(private activatedRoute: ActivatedRoute, private questionnairesService: QuestionnairesService) {
    this.questionnaire = {} as Questionnaire;
  }

  ngOnInit(): void {
    this.loadingVisible = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.activatedRoute.queryParams.subscribe((query: Params) => {
        this.questionnairesService.getByLinkWithPassword(params.link, query.password).subscribe((response : any) => {
          this.questionnaire = response.test;
          console.log(this.questionnaire);
          this.loadingVisible = false;
        })
      });
    });
  }

}
