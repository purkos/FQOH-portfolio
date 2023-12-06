import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProjectService} from "../../../services/project.service";
import {Project} from "../../../models/Project.model";

@Component({
  selector: 'app-project-view-item',
  templateUrl: './project-view-item.component.html',
  styleUrls: ['./project-view-item.component.sass']
})
export class ProjectViewItemComponent implements OnInit, OnDestroy {
  //@ts-ignore
  private routeSub: Subscription;
   project: Project = {
     desc: '',
     img: '',
     id: '',
     title: ''
   }

  constructor(private router: Router, private route: ActivatedRoute, private projectService: ProjectService) {
    this.routeSub = this.route.params.subscribe(param => {
      const projectId = param['id'];
      this.project = this.projectService.getProject(projectId)
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.routeSub.unsubscribe();
  }

  onPreviousTab() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
