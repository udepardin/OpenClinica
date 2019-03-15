import { Moment } from 'moment';

export interface ICountry {
    alpha3Code?: string;
    name?: string;
    region?: string;
    population?: number;
}

export class Country implements ICountry {
    constructor(public alpha3Code?: string, public name?: string, public region?: string, public population?: number) {}
}
