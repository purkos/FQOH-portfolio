import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AuthComponent} from "./pages/auth/auth.component";
import {AboutComponent} from "./pages/about/about.component";
import {ProjectsComponent} from "./pages/projects/projects.component";
<<<<<<< HEAD
=======
import {ProjectComponent} from "./pages/project/project.component";
import {ProjectViewItemComponent} from "./pages/projects/project-view-item/project-view-item.component";
>>>>>>> master

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'auth',component:AuthComponent},
  {path:'about',component:AboutComponent},
  {path:'projects',component:ProjectsComponent},
<<<<<<< HEAD
=======
  {path:'projects/:id', component: ProjectViewItemComponent},
  {path:'project', component:ProjectComponent}
>>>>>>> master
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
