import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './pages/home/home.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {AboutComponent} from './pages/about/about.component';
import {AuthComponent} from './pages/auth/auth.component';
import {ProjectsComponent} from './pages/projects/projects.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ProjectComponent } from './pages/project/project.component';
import { ProjectItemComponent } from './pages/projects/project-item/project-item.component';
import { ProjectViewItemComponent } from './pages/projects/project-view-item/project-view-item.component';
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        FooterComponent,
        HomeComponent,
        NavigationComponent,
        AboutComponent,
        AuthComponent,
        ProjectsComponent,
        ProjectComponent,
        ProjectItemComponent,
        ProjectViewItemComponent,
        LoadingSpinnerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: []
})
export class AppModule {
}
