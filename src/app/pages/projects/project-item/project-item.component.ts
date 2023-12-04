import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Project} from "../../../models/Project.model";



@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.sass']
})
export class ProjectItemComponent {
  @Input() projectItem: Project = {id: '', title:'', desc:''}
  @Output('projectId') projectId: EventEmitter<string> = new EventEmitter()
  constructor() {
  }

  onShowProject(id: string | undefined) {
    this.projectId.emit(id);
  }
}
