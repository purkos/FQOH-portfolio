// project-item.component.ts

import { Component, Input } from '@angular/core';
import { Project } from '../../../models/Project.model';
import { Router } from "@angular/router";

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.sass']
})
export class ProjectItemComponent {
  //@ts-ignore
  @Input() projectItem: Project

  constructor(private router: Router) {

  }

  onShowProject(id:string) {
    this.router.navigate(['/projects', id])
  }
}
