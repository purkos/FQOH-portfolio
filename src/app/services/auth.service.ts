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
}
