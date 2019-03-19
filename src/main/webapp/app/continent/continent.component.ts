import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'app/core';
import { ContinentService } from './continent.service';
import { mergeMap, flatMap, concatMap, map, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Observable, Subject, merge } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-continent',
    templateUrl: './continent.component.html'
})
export class ContinentComponent implements OnInit {
    currentAccount: any;
    continents: any[];
    model: any;
    search: any;
    formatter: any;

    @ViewChild('instance') instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    constructor(protected accountService: AccountService, protected continentService: ContinentService) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.continentService.getContinents().subscribe((responses: any[]) => {
            this.continents = responses;
        });
        this.search = (text$: Observable<string>) => {
            const debouncedText$ = text$.pipe(
                debounceTime(200),
                distinctUntilChanged()
            );
            const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
            const inputFocus$ = this.focus$;

            return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
                map(term =>
                    (term === ''
                        ? this.continents
                        : this.continents.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    ).slice(0, 10)
                )
            );
        };
        this.formatter = (x: { name: string }) => x.name;
    }

    searchContinent() {
        if (this.model === '') {
            this.continentService.getContinents().subscribe((responses: any[]) => {
                this.continents = responses;
            });
        } else {
            this.continentService
                .getContinents()
                .pipe(
                    map((continents: any[]) => {
                        return continents.filter(continent => continent.name === this.model.name);
                    })
                )
                .subscribe((responses: any[]) => {
                    this.continents = responses;
                });
        }
    }
}
