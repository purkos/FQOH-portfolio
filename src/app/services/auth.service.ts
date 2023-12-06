<<<<<<< HEAD
import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, delay, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  // private afAuth = inject(AngularFireAuth)
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  
  constructor() { }

  login(username: string, password: string): Observable<boolean> {
    const isAuthenticated = username === 'admin' && password === 'admin';
    return of(isAuthenticated).pipe(
        delay(1000), // Simulate an asynchronous operation
        tap((auth) => {
          this.isAuthenticatedSubject.next(auth);
        })
    );
  }
  logout():void {
    this.isAuthenticatedSubject.next(false);
  }
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
=======
import {inject, Injectable, OnInit} from '@angular/core';
import {enviroments} from "../enviroments/enviroments";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from '../models/User.model'
import {Router} from "@angular/router";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {
    // @ts-ignore
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    //@ts-ignore
    token: string = null;
    readonly API_KEY: string = enviroments.firebaseConfig.apiKey;

    constructor(private http: HttpClient, private router: Router) {
    }

    ngOnInit(): void {
    }


    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }))
    }

    logout() {
        //@ts-ignore
        this.user.next(null);
        this.router.navigate(['/home'])
        localStorage.removeItem('userData')
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout()
        }, expirationDuration)
    }

    autoLogin() {
        // @ts-ignore
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string;
            // @ts-ignore
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration)
        }
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000)
        localStorage.setItem('userData', JSON.stringify(user))
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already!';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'You are not authorizated to do it!';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'Too many attempts, try later!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'User with this email does not exists!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid!';
                break;
            case 'USER_DISABLED':
                errorMessage = 'Your account is disabled!';
                break;

        }
        return throwError((errorMessage))
    }


>>>>>>> master
}
