import {inject, Injectable} from '@angular/core';
import {exhaustMap, map, Observable, take, tap} from "rxjs";
import {Project} from "../models/Project.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {enviroments} from "../enviroments/enviroments";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private http = inject(HttpClient)
    private authService = inject(AuthService)
    private API_URL = enviroments.apiURL;
    projects: Project[] = [];

    constructor() {
    }

    addProject(project: Project): Observable<Project> {
        return this.http.post<Project>(this.API_URL + 'products.json', project);
    }

    getProjects() {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
                return this.http.get<Project[]>(this.API_URL + 'products.json?auth=' + user.token)
            }),
            map(data => {
                // Transform the data as needed
                const projectsArray = Object.values(data);
                return projectsArray.map(project => {
                    return project
                });
            }))
    }

    // getProduct(id: number): Observable<Project> {
    //
    // }
}
