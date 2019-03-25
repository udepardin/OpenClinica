import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICountry } from './continent.model';
import { map, filter } from 'rxjs/operators';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

type ContinentResponseType = HttpResponse<ICountry[]>;

@Injectable({ providedIn: 'root' })
export class ContinentService {
    public resourceUrl = 'https://restcountries.eu/rest/v2';
    constructor(private http: HttpClient) {}

    getContinents(): Observable<any[]> {
        return this.http.get<any[]>('content/json/continent.json' /*, { observe: 'response' }*/);
    }

    getCountries(continentname: string): Observable<any[]> /*Observable<ContinentResponseType>*/ {
        return this.http.get<ICountry[]>(`${this.resourceUrl}/region/${continentname}` /*, { observe: 'response' }*/);
    }

    getCountryDetail(countrycode: string): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/alpha/${countrycode}`, { observe: 'response' });
    }

    getCountryByName(countryname: string): Observable<any[]> /*Observable<HttpResponse<any[]>>*/ {
        if (countryname !== '') {
            return this.http.get<any[]>(`${this.resourceUrl}/name/${countryname}` /*, { observe: 'response' }*/);
        } else {
            return this.http.get<any[]>(`${this.resourceUrl}/all` /*, { observe: 'response' }*/);
        }
    }
}
