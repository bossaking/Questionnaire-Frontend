import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {Title} from "@angular/platform-browser";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  poland: boolean = true;

  adminActions = [{}];


  actions = [{}];

  constructor(public authService: AuthService, private router: Router, public translate: TranslateService, private titleService: Title) {
    console.log(this.translate.get('SiteTitle'));
  }



  ngOnInit(): void {
    this.poland = localStorage.getItem('lang') === 'pl';
    if(this.poland){
      this.translate.setDefaultLang('pl');
    }else{
      this.translate.setDefaultLang('en');
    }

    this.translate.get('SiteTitle').subscribe((result:  string) => {
      this.titleService.setTitle(result);
      this.actions = [
        {
          id: "1",
          name: result
        }
      ];
      this.translate.get('ShowMine').subscribe((firstOption: string) => {
        this.translate.get('CreateNew').subscribe((secondOption: string) => {
          this.adminActions = [
            {
              id: "1",
              name: result,
              items: [{
                id: "1_1",
                name: firstOption
              },
                {
                  id: "1_2",
                  name: secondOption
                }]
            }
          ]
        });
      });
    });


  }

  menuItemClick(event: any){
    switch (event.itemData.id){
      case "1_2":
        this.router.navigate(["/new-questionnaire"]);
        break;
      case "1_1":
        this.router.navigate(["/mine-questionnaires"]);
        break;
    }
  }

  clickHome(){
    this.router.navigate(["/home"]);
  }

  changeLanguage(){
    if(this.poland){
      localStorage.setItem('lang', 'en');
      this.translate.use('en');
      this.poland = false;
    }else{
      localStorage.setItem('lang', 'pl');
      this.translate.use('pl');
      this.poland = true;
    }
    location.reload();
  }

}
