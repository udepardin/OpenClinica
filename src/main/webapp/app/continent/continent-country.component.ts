import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICountry } from './continent.model';
import { Country } from './continent.model';
import { ContinentService } from './continent.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { ITEMS_PER_PAGE } from 'app/shared';

const COUNTRY_SEARCH = 'SearchKey';

@Component({
    selector: 'jhi-continent-country',
    templateUrl: './continent-country.component.html'
})
export class ContinentCountryComponent implements OnInit {
    countries: ICountry[];
    ContinentName: string;
    country: Country;
    SearchKey: string;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected continentService: ContinentService,
        protected localStorageService: LocalStorageService
    ) {}

    ngOnInit() {
        this.ContinentName = this.activatedRoute.snapshot.params['continentname'];
        // cek local storage isi dari inputan search
        if (this.localStorageService.retrieve(COUNTRY_SEARCH) !== null) {
            // kl ada simpen di vAriable SearchKey
            this.SearchKey = this.localStorageService.retrieve(COUNTRY_SEARCH);
            // setelah disimpan load search(SearchKey)
            this.search();
        } else {
            // kl kosong tidak ada isi load semua data
            this.continentService.getCountries(this.ContinentName).subscribe(response => (this.countries = response.body));
        }
    }

    previousState() {
        window.history.back();
    }

    search() {
        this.continentService.getCountryByName(this.SearchKey).subscribe(response => (this.countries = response.body));
        // localStorage.setItem('Searchkey', this.SearchKey);
        this.localStorageService.store(COUNTRY_SEARCH, this.SearchKey);
    }

    clear() {
        this.SearchKey = '';
        // localStorage.removeItem('Searchkey');
        this.localStorageService.clear(COUNTRY_SEARCH);
        this.continentService.getCountries(this.ContinentName).subscribe(response => (this.countries = response.body));
    }
}
