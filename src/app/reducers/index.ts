import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { InterfaceStateHome } from '../interfaces/InterfaceStateHome';
import { InterfaceState } from '../interfaces/InterfaceState';
import { environment } from '../../environments/environment';
import * as fromHome from './home.reducer';
import * as fromEvent from './event.reducer';


export const reducers: ActionReducerMap<InterfaceState> = {
  home: fromHome.reducer,
  events: fromEvent.reducer
};


export const metaReducers: MetaReducer<InterfaceState>[] = !environment.production ? [] : [];

export const selectHomeState = createFeatureSelector<InterfaceStateHome>('home');

export const selectCategories = createSelector(
  selectHomeState,
  (state: InterfaceStateHome) => state.categories
);
