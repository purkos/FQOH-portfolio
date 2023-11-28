import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Project} from "../models/Project.model";
import {HttpClient} from "@angular/common/http";
import {enviroments} from "../enviroments/enviroments";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient)
  private API_URL = enviroments.apiURL;
  projects: Project[] = [];
  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(this.API_URL)
  }
  addProject(project: Project):Observable<Project> {
    return this.http.post<Project>(this.API_URL+'products.json',project);
  }
  constructor() { }
}
