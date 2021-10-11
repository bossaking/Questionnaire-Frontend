import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerOptions: any = {
    text: "Sign Up",
    type: "success",
    icon: "user",
    stylingMode: "outlined"
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
