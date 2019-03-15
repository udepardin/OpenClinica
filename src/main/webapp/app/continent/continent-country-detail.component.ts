import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICountry } from './continent.model';
import { ContinentService } from './continent.service';

@Component({
    selector: 'jhi-continent-country-detail',
    templateUrl: './continent-country-detail.component.html'
})
export class ContinentCountryDetailComponent implements OnInit {
    country: any;
    CountryCode: string;
    constructor(protected activatedRoute: ActivatedRoute, protected continentService: ContinentService) {}

    ngOnInit() {
        this.CountryCode = this.activatedRoute.snapshot.params['countrycode'];
        this.continentService.getCountryDetail(this.CountryCode).subscribe(response => (this.country = response.body));
        // this.activatedRoute.data.subscribe(({ country }) => {
        //     this.country = country;
        // });
    }

    previousState() {
        window.history.back();
    }
}
