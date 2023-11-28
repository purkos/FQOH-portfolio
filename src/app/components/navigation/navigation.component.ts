import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit{
    private _authService = inject(AuthService);

    get authService(): AuthService {
        return this._authService
    }
    ngOnInit() {
    }
}
