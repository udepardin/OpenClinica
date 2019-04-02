import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICountry } from './continent.model';
import { ContinentService } from './continent.service';
import { threadId } from 'worker_threads';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-continent-country-detail',
    templateUrl: './continent-country-detail.component.html',
    styleUrls: ['continent-country-detail.scss']
})
export class ContinentCountryDetailComponent implements OnInit {
    country: any;
    CountryCode: string;
    pageTabs: any[] = [];
    selectedTabId: string;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected continentService: ContinentService,
        protected alertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.CountryCode = this.activatedRoute.snapshot.params['countrycode'];
        this.continentService.getCountryDetail(this.CountryCode).subscribe(response => (this.country = response.body));
        // this.activatedRoute.data.subscribe(({ country }) => {
        //     this.country = country;
        // });
        this.prepareTabs();
        this.clickTab('CountryDetail1');
    }

    prepareTabs() {
        this.pageTabs = [];

        this.pageTabs.push({
            name: 'Country Detail 1',
            id: 'CountryDetail1'
        });

        this.pageTabs.push({
            name: 'Country Detail 2',
            id: 'CountryDetail2'
        });
    }

    clickTab(tabId) {
        this.alertService.clear();
        this.selectedTabId = tabId;
    }

    previousState() {
        window.history.back();
    }
}
