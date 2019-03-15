import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { OpenClinicaSharedModule } from 'app/shared';
import { continentRoute } from './';
import { ContinentComponent } from './';
import { ContinentCountryComponent } from './';
import { ContinentCountryDetailComponent } from './';

@NgModule({
    imports: [OpenClinicaSharedModule, RouterModule.forChild(continentRoute)],
    declarations: [ContinentComponent, ContinentCountryComponent, ContinentCountryDetailComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    entryComponents: [ContinentComponent, ContinentCountryComponent, ContinentCountryDetailComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OpenClinicaContinentModule {}
