import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { PlayerServiceService } from "../services/player-service.service";

@Component({
  selector: 'fifteen-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;

  private formErrors: Object = {
    "userLogin": "",
  };

  private validationMessages: Object = {
    "userLogin": {
      "required": "Поле обязательно для заполнения.",
      "minlength": "Введите не мение 4 символов.",
      "maxlength": "Введите мение 16 символов."
    }
  };


  private formErrorMessageBox: string;
  private messageBoxVisibility: boolean = false;

  constructor(public PlayerServiceService: PlayerServiceService, public router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      "userLogin": ["", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16)
      ]],
    });

    this.loginForm.valueChanges
        .subscribe(data => this.onValueChange(data));
  }

  onValueChange(data?: any) {
    if (!this.loginForm) return;

    this.messageBoxVisibility = false;
    let form = this.loginForm;

    for (let field in this.formErrors) {

      this.formErrors[field] = "";
      let control = form.get(field);

      if (control && control.dirty && !control.valid) {
        let message = this.validationMessages[field];

        for (let key in control.errors) {
          this.formErrors[field] += message[key] + " ";
        }
      }
    }
  }

  private login() {

    if(!this.loginForm.valid) {
      this.messageBoxVisibility = true;
      this.formErrorMessageBox = "Форма не валидна попробуйте исправить ошибки полей ввода!";
      return;
    }

    this.PlayerServiceService
        .loginUser( this.loginForm.get('userLogin').value );
        // .then((data) => {
        //   console.log(data);
        //   if (data) {
        //     this.router.navigate(['/game']);
        //     return true;
        //   }
        //   else {
        //     this.messageBoxVisibility = true;
        //     this.formErrorMessageBox = "Пользователь с таким именем уже существует!";
        //     return false;
        //   }
        // });
  }

}
