import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {RegisterUser} from "../Interfaces/RegisterUser";
import notify from "devextreme/ui/notify";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loadIndicatorVisible = false;

  registerUser: RegisterUser;

  registerOptions: any = {};

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router, private translate: TranslateService) {
    this.registerUser = {} as RegisterUser;
  }

  ngOnInit(): void {
    this.translate.get('Registration').subscribe((result: any) => {
      this.registerOptions = {
        text: result,
        type: "success",
        icon: "user",
        stylingMode: "outlined",
        useSubmitBehavior: true,
        onClick: () => {
          this.register()
        }
      };
    });
  }

  register() {
    this.loadIndicatorVisible = true;
    this.authService.register(this.registerUser).subscribe((result: boolean) => {
      this.loadIndicatorVisible = false;
      if(result){
        this.router.navigate(['/home']);
      }
    });
  }

}
