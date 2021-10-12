import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

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
      name: "Show mine"
    },
      {
        id: "1_2",
        name: "Create new"
      }]
  }];

  constructor(public authService: AuthService, private router: Router) { }



  ngOnInit(): void {
  }

  menuItemClick(event: any){
    switch (event.itemData.name){
      case "Create new":
        this.router.navigate(["/new-questionnaire"]);
        break;
    }
  }

  clickHome(){
    this.router.navigate(["/home"]);
  }

}
