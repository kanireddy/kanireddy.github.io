import { Component, OnInit } from '@angular/core';
import { Country } from '../../../interfaces/country';
import { Observable } from 'rxjs/internal/Observable';
import { InterfaceState } from 'src/app/interfaces/InterfaceState';
import { InterfaceStateHome } from 'src/app/interfaces/InterfaceStateHome';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { selectHomeState } from '../../../reducers/index';
import { Subject } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private stop$: Subject<boolean> = new Subject();

  homeState$: Observable<InterfaceStateHome>;

  countries: Country[] = [];


  constructor(
    private store: Store<InterfaceState>
  ) {
    this.homeState$ = this.store.pipe(
      takeUntil(this.stop$),
      select(selectHomeState)
    );
   }

  ngOnInit() {
    this.homeState$.subscribe(homeState => {
      this.countries = cloneDeep(homeState.countries);
    });
  }

}
