import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core';
import { ContinentService } from './continent.service';

@Component({
    selector: 'jhi-continent',
    templateUrl: './continent.component.html'
})
export class ContinentComponent implements OnInit {
    currentAccount: any;
    continents: any;
    constructor(protected accountService: AccountService, protected continentService: ContinentService) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.continentService.getContinents().subscribe(response => (this.continents = response.body));
    }
    /*ngOnInit() {
        this.route.data.subscribe(({ user }) => {
            this.user = user.body ? user.body : user;
        });
    }*/
}
