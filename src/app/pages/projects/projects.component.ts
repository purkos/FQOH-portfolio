import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Project} from "../../models/Project.model";
import {ProjectService} from "../../services/project.service";
import {v4 as uuidv4} from 'uuid';
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {

    projectShowId: string | undefined;
    private fb = inject(FormBuilder)
    private _projectService = inject(ProjectService)
    private _authService = inject(AuthService)

    private _projectForm: FormGroup;

    get projectForm(): FormGroup {
        return this._projectForm;
    }

    project: Project = {
        title: '',
        desc: '',
        img: '',
        id: '',
    }
    projects: Project[] = [];
    projectService = inject(ProjectService)

    constructor() {
        this._projectForm = this.fb.group({
            'title': [null, [Validators.required, Validators.minLength(3)]],
            'desc': [null, [Validators.required, Validators.minLength(3)]],
            // 'img': [null, [Validators.required]]
        })
        this.projectService.getProjects().subscribe(
            (data) => {
                this.projects = data
            }
        )
    }

    ngOnInit() {
    }

    onFileSelected(event: any) {
        let file
        console.log(event.target.files[0])
        // file = (event.target as HTMLInputElement).files[0];
        // this.projectForm.patchValue({
        //   'img': file
        // })
    }
    onAddProject() {
        this.project.title = this.projectForm.get('title')?.value;
        this.project.desc = this.projectForm.get('desc')?.value
        this.project.id = uuidv4()
        // this.project.img = this.projectForm.get('img')?.value;

        this._projectService.addProject(this.project).subscribe(
            (response) => {
            }
        )
    }

    showProject(id: string) {
        this.projectShowId = id;
    }
}
