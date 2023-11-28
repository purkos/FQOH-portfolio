import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Project} from "../../models/Project.model";
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit{

  private fb = inject(FormBuilder)
  private _projectService = inject(ProjectService)

  private _projectForm:FormGroup;

  get projectForm(): FormGroup {
    return this._projectForm;
  }
  project: Project = {
    title:'',
    desc:'',
    img:'',
    id:'',
  }

  constructor() {
    this._projectForm = this.fb.group({
      'title': [null, [Validators.required, Validators.minLength(3)]],
      'desc': [null, [Validators.required, Validators.minLength(3)]],
      // 'img': [null, [Validators.required]]
    })
  }

  ngOnInit() {
  }
  onFileSelected(event:any) {
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
    // this.project.img = this.projectForm.get('img')?.value;

    this._projectService.addProject(this.project).subscribe(
        (response)=>{
          console.log(response)
        }
    )
  }
}
