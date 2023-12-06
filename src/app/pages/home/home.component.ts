<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import {Component, inject, OnInit} from '@angular/core';
import {ProjectService} from "../../services/project.service";
import {Project} from "../../models/Project.model";
>>>>>>> master

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
<<<<<<< HEAD
export class HomeComponent {
=======
export class HomeComponent implements OnInit{


  ngOnInit() {

  }
>>>>>>> master

}
