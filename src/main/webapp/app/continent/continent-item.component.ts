import { Component, OnInit, Input } from '@angular/core';

import { DATE_FORMAT } from 'app/shared';

@Component({
    selector: 'jhi-continent-item',
    templateUrl: './continent-item.component.html',
    styleUrls: ['continent.scss']
})
export class ContinentItemComponent implements OnInit {
    @Input() continent: any;
    dateFormat = DATE_FORMAT;

    constructor() {}

    ngOnInit() {}
}
