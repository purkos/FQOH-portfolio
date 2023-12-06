// projects.component.ts

import {Component, inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Project } from "../../models/Project.model";
import { ProjectService } from "../../services/project.service";
import { v4 as uuidv4 } from 'uuid';
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {
    projectShowId: string | undefined;
    private fb = inject(FormBuilder);
    private _projectService = inject(ProjectService);
    private _authService = inject(AuthService);
    private _projectForm: FormGroup;
    isLoading: boolean = false;

    get projectForm(): FormGroup {
        return this._projectForm;
    }

    projects: Project[] = [];
    projectService = inject(ProjectService);

    constructor() {
        this._projectForm = this.fb.group({
            'title': [null, [Validators.required, Validators.minLength(3)]],
            'desc': [null, [Validators.required, Validators.minLength(3)]],
        });

        this.isLoading = true;
        this.projectService.getProjects().subscribe(


            (data) => {
                this.projects = data;
                this.isLoading = false;
            },
            (error) => {
                this.isLoading = false;
            }
        );
    }

    ngOnInit() {
    }
}
