import { createAction, props } from '@ngrx/store';
import { Category } from '../interfaces/category';
import { Country } from '../interfaces/country';
import { Location } from '../interfaces/location';

export const setCategoryData = createAction(
  '[home] SET_CATEGORY_DATA',
  props<{categories: Category[]}>()
);

export const setLocationData = createAction(
  '[home] SET_LOCATION_DATA',
  props<{locations: Location[]}>()
);

export const setCountryData = createAction(
  '[home] SET_COUNTRY_DATA',
  props<{countries: Country[]}>()
);

export const setSelectCat = createAction(
  '[home] SET_SELECT_CAT',
  props<{selectCat: Category}>()
);

export const setSelectLoc = createAction(
  '[home] SET_SELECT_LOC',
  props<{selectLoc: Location}>()
);

export const setSelectCou = createAction(
  '[home] SET_SELECT_COU',
  props<{selectCou: Country}>()
);

export const setPage = createAction(
  '[home] SET_PAGE',
  props<{page: number}>()
);

export const setEventDetail = createAction(
  '[home] SET_EVENT_DETAIL',
  props<{eventDetail: any}>()
);

export const eventDetailLoading = createAction('[home] EVENT_DETAIL_LOADING');
export const eventDetailLoaded = createAction('[home] EVENT_DETAIL_LOADED');

export const loadMoreEvents = createAction('[home] LOAD_MORE_EVENTS');
