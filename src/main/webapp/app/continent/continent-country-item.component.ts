import { Component, OnInit, Input } from '@angular/core';

import { DATE_FORMAT } from 'app/shared';

@Component({
    selector: 'jhi-continent-country-item',
    templateUrl: './continent-country-item.component.html',
    styleUrls: ['continent-country.scss']
})
export class ContinentCountryItemComponent implements OnInit {
    @Input() country: any;
    dateFormat = DATE_FORMAT;

    constructor() {}

    ngOnInit() {}
}
