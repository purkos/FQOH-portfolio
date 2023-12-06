import {inject, Injectable} from '@angular/core';
import {exhaustMap, map, Observable, take, tap} from "rxjs";
import {Project} from "../models/Project.model";
import {HttpClient, } from "@angular/common/http";
import {enviroments} from "../enviroments/enviroments";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private http = inject(HttpClient)
    private authService = inject(AuthService)
    isLoading: boolean = false;
    private API_URL = enviroments.firebaseConfig.databaseURL;
    projects: Project[] = [];

    constructor() {
    }

    addProject(project: Project): Observable<Project> {
        return this.authService.user.pipe(take(1),exhaustMap(user=> {
            return this.http.post<Project>(this.API_URL + '/products.json?auth='+user.token, project);
        }))
    }

    getProjects() {
        // return this.authService.user.pipe(take(1), exhaustMap(user => {
        //         return this.http.get<Project[]>(this.API_URL + '/products.json?auth=' + user.token)
        //     }),
        //     map(data => {
        //         // Transform the data as needed
        //         const projectsArray = Object.values(data);
        //         return projectsArray.map(project => {
        //             this.projects.push(project)
        //             return project
        //         });
        //     }))

        return this.http.get<{ [key: string]: Project }>(`${this.API_URL}/products.json`)
            .pipe(
                map(data => {
                    // Transform the data as needed
                    const projectsArray: Project[] = Object.values(data);
                    this.projects = projectsArray; // Assuming you want to update the projects array
                    return projectsArray;
                })
            );
    }



    getProject(projectId: string) {
        const [filteredProject] = this.projects.filter(project=> {
            return project.id === projectId
        })
        return filteredProject
    }
}
