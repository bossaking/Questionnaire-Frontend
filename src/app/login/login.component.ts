import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {LoginUser} from "../Interfaces/LoginUser";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loadIndicatorVisible = false;
  loginUser: LoginUser;

  loginOptions: any = {};

  constructor(private authService: AuthService, private router: Router, private translate: TranslateService) {
    this.loginUser = {} as LoginUser;
  }

  ngOnInit(): void {
    this.translate.get("Login").subscribe((result: string) => {
      this.loginOptions = {
        text: result,
        type: "success",
        icon: "user",
        stylingMode: "outlined",
        onClick: () => {
          this.login()
        }
      };
    });
  }

  login(){
    this.loadIndicatorVisible = true;
    this.authService.login(this.loginUser).subscribe((result: boolean) => {
      this.loadIndicatorVisible = false;
      if(result){
        this.router.navigate(['/home']);
      }
    });
  }

}
