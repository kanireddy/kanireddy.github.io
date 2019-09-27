import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Category } from '../../interfaces/category';
import { Observable } from 'rxjs/internal/Observable';
import { InterfaceState } from 'src/app/interfaces/InterfaceState';
import { Event } from 'src/app/interfaces/event';
import { InterfaceStateHome } from 'src/app/interfaces/InterfaceStateHome';
import { select, Store } from '@ngrx/store';
import { takeUntil, debounceTime, take, distinctUntilChanged } from 'rxjs/operators';
import { selectHomeState } from '../../reducers/index';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as fromEvent from '../../reducers/event.reducer';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private stop$: Subject<void> = new Subject();

  homeState$: Observable<InterfaceStateHome>;
  eventState$: Observable<fromEvent.EventState>;
  events: {[id: number]: Event} = null;

  public categories: Category[];

  constructor(
    private mainService: MainService,
    private store: Store<InterfaceState>,
    private route: ActivatedRoute,
  ) {
    this.homeState$ = this.store.pipe(
      takeUntil(this.stop$),
      select(selectHomeState),
      debounceTime(600)
    );
    this.eventState$ = this.store.pipe(
      takeUntil(this.stop$),
      select(fromEvent.selectEventState),
      distinctUntilChanged()
    );
  }

  ngOnInit() {
    this.eventState$.subscribe(stateEvents => {
      this.events = stateEvents.entities;
    });
    // this.homeState$.subscribe(homeState => {
    //   if (!!this.events) {
    //     this.route.paramMap.subscribe(params => {
    //       if (!!params.get('event_type')) {
    //         const category = params.get('event_type').replace('-events', '');
    //         if (!!category) {
    //           const cat = homeState.categories.find(catItem => catItem.value === category);
    //           this.mainService.setSelectCategory(cat);
    //         }
    //       } else {
    //         this.store.dispatch({ type : '[home] LOAD_MORE_EVENTS' });
    //       }
    //     });
    //   }
    // });
    this.store.dispatch({ type : '[home] LOAD_MORE_EVENTS' });
    this.mainService.getCategories();
    this.mainService.getLocations();
    this.mainService.getCountries();
  }

  ngOnDestroy() {
    this.stop$.next();
  }

}
