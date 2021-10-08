import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  actions: any = [{
    id: "1",
    name: "Questionnaires",
    items: [{
      id: "1_1",
      name: "Show all"
    },
      {
        id: "1_2",
        name: "Create new"
      }]
  }];

  constructor() { }



  ngOnInit(): void {
  }

}