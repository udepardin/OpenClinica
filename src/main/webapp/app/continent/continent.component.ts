import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core';
import { ContinentService } from './continent.service';
import { mergeMap, flatMap, concatMap, map } from 'rxjs/operators';
import { threadId } from 'worker_threads';
import { Country } from './continent.model';

@Component({
    selector: 'jhi-continent',
    templateUrl: './continent.component.html'
})
export class ContinentComponent implements OnInit {
    currentAccount: any;
    continents: any[];
    countries: any[];
    constructor(protected accountService: AccountService, protected continentService: ContinentService) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        // this.continentService.getContinents().subscribe(response => (this.continents = response.body));
        this.continentService
            .getContinents()
            .pipe(
                map((continents: any[]) => {
                    console.log(continents);
                    continents.map(continent => {
                        continent.title = 'Benua';
                        this.continentService
                            .getCountries(continent.name)
                            .pipe(
                                map((countries: any[]) => {
                                    console.log(countries);
                                    countries.filter(country => {
                                        continent.country = country.name;
                                        return country;
                                    });
                                    return countries;
                                })
                            )
                            .subscribe((responseCountries: any[]) => {
                                this.countries = responseCountries;
                            });
                        return continent;
                    });
                    return continents;
                })
            )
            .subscribe((responses: any[]) => {
                // responses.map(response => {
                //     this.continentService.getCountries(response.name)
                //         .subscribe(responseCountry => this.countries = responseCountry.body);
                // });
                this.continents = responses;
            });
    }
}
