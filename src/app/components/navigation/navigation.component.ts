<<<<<<< HEAD
import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";
=======
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import {Router} from "@angular/router";
>>>>>>> master

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.sass']
})
<<<<<<< HEAD
export class NavigationComponent implements OnInit{
    private _authService = inject(AuthService);

    get authService(): AuthService {
        return this._authService
    }
    ngOnInit() {
=======
export class NavigationComponent implements OnInit, OnDestroy {
    //@ts-ignore
    private userSub: Subscription;
    isAuthenticated = false;

    constructor(private authService: AuthService) {}

    onLogout() {
        this.authService.logout()

    }
    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    ngOnDestroy() {
        if (this.userSub) {
            this.userSub.unsubscribe();
        }
>>>>>>> master
    }
}
