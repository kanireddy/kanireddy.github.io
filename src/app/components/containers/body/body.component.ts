import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Event } from '../../../interfaces/event';
import { Category } from '../../../interfaces/category';
import { Location } from '../../../interfaces/location';
import { MainService } from '../../../services/main.service';
import { select, Store } from '@ngrx/store';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { InterfaceStateHome } from 'src/app/interfaces/InterfaceStateHome';
import { InterfaceState } from 'src/app/interfaces/InterfaceState';
import { debounceTime, distinctUntilChanged, map, takeUntil, filter } from 'rxjs/operators';
import { selectHomeState } from '../../../reducers/index';
import { cloneDeep } from 'lodash';
import { Country } from '../../../interfaces/country';
import { setPage } from '../../../actions/home.action';
import { selectAllEvents, selectMoreEvents } from '../../../reducers/event.reducer';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  private stop$: Subject<boolean> = new Subject();

  locModel: any;
  catModel: any;

  homeState$: Observable<InterfaceStateHome>;
  moreEvents$: Observable<boolean>;
  events: Event[] = null;

  @ViewChild('locInstance', {static: true}) locInstance: NgbTypeahead;
  @ViewChild('catInstance', {static: true}) catInstance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  catFocus$ = new Subject<string>();
  catClick$ = new Subject<string>();

  categories: Category[] = [];
  locations: Location[] = [];
  page: number;
  cat: Category;
  loc: Location;
  cou: Country;

  selectedCat: string;
  filterToggle = false;
  catVisible = false;
  locVisible = false;
  timeVisible = false;

  locSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.locInstance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => this.locations)
    );
  }

  locFormatter = (x: {name: string}) => null;

  catSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.catClick$.pipe(filter(() => !this.catInstance.isPopupOpen()));
    const inputFocus$ = this.catFocus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => this.categories)
    );
  }

  catFormatter = (x: {name: string}) => null;

  constructor(
    private mainService: MainService,
    private store: Store<InterfaceState>
  ) {
    this.homeState$ = this.store.pipe(
      takeUntil(this.stop$),
      select(selectHomeState)
    );
    this.store.pipe(
      takeUntil(this.stop$),
      select(selectAllEvents)
    ).subscribe( events => {
      this.events = cloneDeep(events);
    });
    this.moreEvents$ = this.store.pipe(
      takeUntil(this.stop$),
      select(selectMoreEvents)
    );
  }


  ngOnInit() {
    this.homeState$.subscribe(homeState => {
      this.categories = cloneDeep(homeState.categories);
      this.locations = cloneDeep(homeState.locations);
      this.page = cloneDeep(homeState.page);
      this.cat = cloneDeep(homeState.selectCat);
      this.loc = cloneDeep(homeState.selectLoc);
      this.cou = cloneDeep(homeState.selectCou);
    });
  }

  // toggleFilter(homeFilter: string) {
  //   switch (homeFilter) {
  //     case 'cat': if (this.selectedCat === 'cat') {
  //                   this.filterToggle = !this.filterToggle;
  //                 } else {
  //                   this.selectedCat = 'cat';
  //                   this.filterToggle = true;
  //                 }
  //                 this.catVisible = true;
  //                 this.locVisible = false;
  //                 this.timeVisible = false;
  //                 break;
  //     case 'loc': if (this.selectedCat === 'loc') {
  //                   this.filterToggle = !this.filterToggle;
  //                 } else {
  //                   this.selectedCat = 'loc';
  //                   this.filterToggle = true;
  //                 }
  //                 this.locVisible = true;
  //                 this.catVisible = false;
  //                 this.timeVisible = false;
  //                 break;
  //     case 'time': if (this.selectedCat === 'time') {
  //                   this.filterToggle = !this.filterToggle;
  //                 } else {
  //                   this.selectedCat = 'time';
  //                   this.filterToggle = true;
  //                 }
  //                  this.locVisible = false;
  //                  this.catVisible = false;
  //                  this.timeVisible = true;
  //                  break;
  //     default: this.filterToggle = !this.filterToggle;
  //   }
  // }

  loadCatEvents(catItem) {
    // if (!!toggle && toggle) {
    // } else {
    //   this.toggleFilter('cat');
    // }
    const category = this.categories.find(cat => cat.name === catItem.item.name);
    this.mainService.setSelectCategory(category);
  }

  loadLocEvents(locationItem) {
    // this.toggleFilter('loc');
    const location = this.locations.find(loc => loc.name === locationItem.item.name);
    this.mainService.setSelectLocation(location);
  }

  loadMoreEvents() {
    this.store.dispatch(setPage(
      {page: this.page + 1}
    ));
    this.store.dispatch({ type : '[home] LOAD_MORE_EVENTS' });
  }
}
