import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  logged: boolean = false;
  errors: string = '';
  private _loginForm: FormGroup;
  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)
  get loginForm(): FormGroup {
    return this._loginForm;
  }
  constructor() {
    this._loginForm = this.fb.group({
      'login': [null, [Validators.required, Validators.minLength(3)]],
      'password': [null, [Validators.required, Validators.minLength(3)]]
    });
  }
  ngOnInit() {

  }
  onLogin() {
    const username=this.loginForm.get('login')?.value;
    const password=this.loginForm.get('password')?.value;

    this.authService.login(username,password).subscribe(
        (success)=>{
          if(success) {

            this.logged = true;
            this.router.navigate(['/home'])

          } else {
            this.errors = 'Wrong credientials!';
            this.logged = false;
          }
        },
        (error)=> {
          console.error(error)
        }
    )
  }
  onClearErrors() {
    this.errors = '';
    this.loginForm.patchValue({
      'login': '',
      'password': ''
    })
  }
}
