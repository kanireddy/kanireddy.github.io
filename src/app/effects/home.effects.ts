import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { tap, concatMap, withLatestFrom } from 'rxjs/operators';
import { MainService } from '../services/main.service';
import { InterfaceState } from '../interfaces/InterfaceState';
import { loadMoreEvents, setSelectCat, setPage, setSelectLoc } from '../actions/home.action';
import * as fromState from '../reducers';

@Injectable()
export class HomeEffects {

  loadEvents$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadMoreEvents, setSelectCat, setSelectLoc),
        concatMap( action => of(action).pipe(
          withLatestFrom(this.store.pipe(select(fromState.selectHomeState)))
        )),
        tap(([action, homeState]) => {
          if (!!homeState) {
            const formData: any = {};
            if (!!homeState && !!homeState.selectCat) {
              formData.categoryId = homeState.selectCat.id;
            }
            if (!!homeState && !!homeState.selectLoc) {
              formData.cityId = homeState.selectLoc.id;
            }
            if (!!homeState && !!homeState.page) {
              formData.page = homeState.page;
            }
            if (!!action &&
              (action.type === '[home] SET_SELECT_CAT' ||
              action.type === '[home] SET_SELECT_LOC')) {
                formData.replaceEvents = true;
                formData.page = 1;
            }
            this.mainService.loadMore(formData);
          }
        }
        )
      ),
      { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private mainService: MainService,
    private store: Store<InterfaceState>,
    ) {}

}
