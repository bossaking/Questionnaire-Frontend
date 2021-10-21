import { Component, OnInit } from '@angular/core';
import {QuestionnairesService} from "../services/questionnaires.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  loadingVisible: boolean = false;

  constructor(private questionnairesService: QuestionnairesService, private activatedRoute: ActivatedRoute) { }

  questionnaireDetails: any = {};

  ngOnInit(): void {
    this.loadingVisible = true;
    this.activatedRoute.params.subscribe(result => {
      this.questionnairesService.details(result.link).subscribe(response => {
        this.questionnaireDetails = response.test;
        console.log(this.questionnaireDetails.test);
        this.loadingVisible = false;
      })
    });

  }

}
