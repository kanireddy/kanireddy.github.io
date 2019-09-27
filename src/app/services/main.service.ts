import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { Event } from '../interfaces/event';
import { Category } from '../interfaces/category';
import { InterfaceState } from '../interfaces/InterfaceState';
import { Store } from '@ngrx/store';
import {
  setCategoryData,
  setSelectCat,
  setLocationData,
  setPage,
  setCountryData,
  setSelectCou,
  setSelectLoc,
  setEventDetail,
  eventDetailLoading,
  eventDetailLoaded
} from '../actions/home.action';
import { Country } from '../interfaces/country';
import { Location } from '../interfaces/location';
import * as eventActions from '../actions/event.action';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public events: Event[];
  public limit = 6;

  constructor(
    private apiService: ApiService,
    private store: Store<InterfaceState>
  ) { }

  public loadMore(formData: any = null) {
    const paramsObj: any = {
      countryId: '14',
      page: 1,
      day: '6',
      limit: this.limit,
      eventMode: '12',
      eventType: 'nonwebinar'
    };
    if (!!formData && !!formData.categoryId) {
      paramsObj.categoryId = formData.categoryId;
    }
    if (!!formData && !!formData.cityId) {
      paramsObj.cityId = formData.cityId;
    }
    if (!!formData && !!formData.page) {
      paramsObj.page = !!formData.page ? formData.page : 1;
    }
    const params = new HttpParams({
      fromObject: paramsObj
    });
    this.apiService.get('/event/list', params).subscribe(
      (data: any) => {
        let tempEvents: Event[] = [];
        if (data.response.total > 0) {
          tempEvents = data.response.eventList;
          if (data.response.nextPage === true) {
            this.store.dispatch(eventActions.moreEvents());
          } else if (data.response.nextPage === false) {
            this.store.dispatch(eventActions.noMoreEvents());
          }
        }
        if (formData.replaceEvents === true) {
          this.store.dispatch(eventActions.loadEvents(
            { events: tempEvents }
          ));
          this.store.dispatch(setPage(
            { page: 1 }
          ));
        } else {
          this.store.dispatch(eventActions.addEvents(
            { events: tempEvents }
          ));
        }
      }
    );
  }

  public getCategories() {
    const params = new HttpParams()
      .set('major', '1');
    return this.apiService.get('/category/list', params).subscribe(
      (data: any) => {
        this.store.dispatch(setCategoryData(
          { categories: data.response.categoryList }
        ));
      }
    );
  }

  public getLocations() {
    const params = new HttpParams()
      .set('countryId', '14');
    return this.apiService.get('/city/list', params).subscribe(
      (data: any) => {
        this.store.dispatch(setLocationData(
          { locations: data.response.cityList }
        ));
      }
    );
  }

  public getCountries() {
    const params = new HttpParams()
      .set('major', '1');
    return this.apiService.get('/country/list', params).subscribe(
      (data: any) => {
        this.store.dispatch(setCountryData(
          { countries: data.response.countryList }
        ));
      }
    );
  }

  public setSelectCategory(newSelectCat: Category) {
    this.store.dispatch(setSelectCat(
      { selectCat: newSelectCat }
    ));
  }

  public setSelectCountry(newSelectCou: Country) {
    this.store.dispatch(setSelectCou(
      { selectCou: newSelectCou }
    ));
  }

  public setSelectLocation(newSelectLoc: Location) {
    this.store.dispatch(setSelectLoc(
      { selectLoc: newSelectLoc }
    ));
  }

  public getEventDetail(eventId?: number) {
    const params = new HttpParams()
      .set('eventId', eventId.toString());
    this.store.dispatch(eventDetailLoading());
    return this.apiService.get('/event/detail', params).subscribe(
      (data: any) => {
        this.store.dispatch(setEventDetail(
          { eventDetail: data.response.details }
        ));
        this.store.dispatch(eventDetailLoaded());
      }
    );
  }

}
