import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerServiceService } from '../services/player-service.service';
import { Player } from '../models';

@Component({
  selector: 'fifteen-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formErrorMessageBox: string;
  public messageBoxVisibility: boolean;
  public loginForm: FormGroup;

  public formErrors = {
    'userLogin': '',
  };

  public validationMessages = {
    'userLogin': {
      'required': 'Поле обязательно для заполнения.',
      'minlength': 'Введите не мение 4 символов.',
      'maxlength': 'Введите мение 16 символов.'
    }
  };

  constructor(public playerServiceService: PlayerServiceService, public router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.router.navigate(['/game']);
    this.messageBoxVisibility = false;
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      'userLogin': ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16)
      ]],
    });

    this.loginForm.valueChanges
        .subscribe(data => this.onValueChange(data));
  }

  onValueChange(data?: any) {
    if (!this.loginForm) { return; }

    this.messageBoxVisibility = false;
    const form = this.loginForm;

    for (let field in this.formErrors) {

      this.formErrors[field] = '';
      let control = form.get(field);

      if (control && control.dirty && !control.valid) {
        let message = this.validationMessages[field];

        for (let key in control.errors) {
          this.formErrors[field] += message[key] + ' ';
        }
      }
    }
  }

  public login() {

    if ( !this.loginForm.valid ) {
      this.messageBoxVisibility = true;
      this.formErrorMessageBox = 'Форма не валидна попробуйте исправить ошибки полей ввода!';
      return;
    }

    this.playerServiceService
        .loginUser( this.loginForm.get('userLogin').value )
        .then( player => {
          if ( player instanceof Player) {
              this.router.navigate(['/']);
          }
        });
  }

}
