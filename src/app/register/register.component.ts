import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {RegisterUser} from "../Interfaces/RegisterUser";
import notify from "devextreme/ui/notify";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loadIndicatorVisible = false;

  registerUser: RegisterUser;

  registerOptions: any = {
    text: "Sign Up",
    type: "success",
    icon: "user",
    stylingMode: "outlined",
    onClick: () => {
      this.register()
    }
  };

  constructor(private authService: AuthService, private toastr: ToastrService) {
    this.registerUser = {} as RegisterUser;
  }

  ngOnInit(): void {
  }

  register() {
    this.loadIndicatorVisible = true;
    this.authService.register(this.registerUser).subscribe(result => {
      this.loadIndicatorVisible = false;
      console.log(result);
    });
  }

}
