import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthResponseData, AuthService} from "../../services/auth.service";
import {Router, RouterModule} from "@angular/router";
import {Observable} from "rxjs";

// noinspection JSDeprecatedSymbols
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {


    // @ts-ignore
    error: string = null;
    isLoginMode = true;
    isLoading = false;
    form: FormGroup;
    // private form = inject(FormGroup);
    private fb = inject(FormBuilder)
    private authService = inject(AuthService)
    private router = inject(Router)


    constructor() {
        this.form = this.fb.group({
            'email': [null, [Validators.required, Validators.email]],
            'password': [null, [Validators.required, Validators.minLength(6)]]
        });
    }

    ngOnInit() {

    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode
    }

    onSubmit() {
        if (!this.form.valid) {
            return;
        }
        const email = this.form.get('email')?.value;
        const password = this.form.get('password')?.value;

        let authObs: Observable<AuthResponseData>

        this.isLoading = true;
        if (this.isLoginMode) {
            authObs = this.authService.login(email, password)
        } else {
            authObs = this.authService.signUp(email, password)
        }
        authObs.subscribe(resData => {
            console.log(resData)
            this.isLoading = false;
            this.router.navigate(['/home'])
        }, errorMessage => {
            console.log(errorMessage)
            this.error = errorMessage
            this.isLoading = false;
        })
        this.form.reset()
    }

    onClearError() {
        // @ts-ignore
        this.error = null;
    }
}
