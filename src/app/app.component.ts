<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
>>>>>>> master

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
<<<<<<< HEAD
export class AppComponent {
  title = 'test';
=======
export class AppComponent implements OnInit{
  title = 'FQOH - portfolio';

  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    this.authService.autoLogin();
  }
>>>>>>> master
}
