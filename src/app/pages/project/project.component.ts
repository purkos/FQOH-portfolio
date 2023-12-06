import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Project} from "../../models/Project.model";
import {ProjectService} from "../../services/project.service";
import {v4 as uuidv4} from 'uuid';
import {finalize, Observable, } from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";



// import {AngularFireStorage} from "@angular/fire/compat/storage";



@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {

    private fb = inject(FormBuilder)
    private _projectService = inject(ProjectService)
    private basePath = '/projectsImages'

    isAdding = false

    private _projectForm: FormGroup;
    //@ts-ignore
    private downloadURL: Observable<any>;
    fbURL: string = ''
    get projectForm(): FormGroup {
        return this._projectForm;
    }

    project: Project = {
        title: '',
        desc: '',
        img: '',
        id: '',
    }

    constructor(private storage: AngularFireStorage) {
        this._projectForm = this.fb.group({
            'title': [null, [Validators.required, Validators.minLength(3)]],
            'desc': [null, [Validators.required, Validators.minLength(3)]],
        })
    }


    ngOnInit() {
    }

    pushFileToStorage(fileUpload: File): Observable<string> {
        const n = Date.now();
        const filePath = `${this.basePath}/${n}`;
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, fileUpload);

        return new Observable<string>(observer => {
            uploadTask.snapshotChanges().pipe(
                finalize(() => {
                    fileRef.getDownloadURL().subscribe(url => {
                        if (url) {
                            observer.next(url);
                            observer.complete();
                        } else {
                            observer.error('Download URL is not available.');
                        }
                    });
                })
            ).subscribe();
        });
    }

    onAddProject(event: any) {
        this.project.title = this.projectForm.get('title')?.value;
        this.project.desc = this.projectForm.get('desc')?.value;
        this.project.id = uuidv4();
        this.isAdding = true;

        const file = event.target.elements.image.files[0];

        if (file) {
            this.pushFileToStorage(file).subscribe(
                url => {
                    this.project.img = url;

                    // Continue with the rest of the logic (e.g., call the service to add the project)
                    this._projectService.addProject(this.project).subscribe(resData => {
                        this.isAdding = false;
                        this.projectForm.reset();
                    }, error => {
                        this.isAdding = false;
                    });
                },
                error => {
                    console.error(error);
                    // Handle the error (e.g., show a message to the user)
                }
            );
        } else {
            console.error('File is not available.');
            // Handle the case where the file is not available.
        }
    }

}
