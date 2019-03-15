import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { UserRouteAccessService } from 'app/core';
import { ContinentComponent } from './continent.component';
import { ContinentCountryComponent } from './continent-country.component';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ContinentService } from './continent.service';
import { ICountry } from './continent.model';
import { Country } from './continent.model';
import { ContinentCountryDetailComponent } from './continent-country-detail.component';

// @Injectable({ providedIn: 'root' })
// export class ContinentResolve implements Resolve<IContinent> {
//     constructor(private service: ContinentService) {}

//     // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContinent> {
//     //     const name = route.params['name'] ? route.params['name'] : null;
//     //         return this.service.findAll(name).pipe(
//     //             filter((response: HttpResponse<Continent>) => response.ok),
//     //             map((continent: HttpResponse<Continent>) => continent.body)
//     //         );
//     // }
// }

export const continentRoute: Routes = [
    {
        path: 'continent',
        component: ContinentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'continent'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'continent/:continentname/view',
        component: ContinentCountryComponent,
        // resolve: {
        //     continent: ContinentResolve
        // },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'country'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'continent/:continentname/:countrycode/view',
        component: ContinentCountryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'country'
        },
        canActivate: [UserRouteAccessService]
    }
];
