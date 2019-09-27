import { Action, createReducer, on, State } from '@ngrx/store';
import { InterfaceStateHome } from '../interfaces/InterfaceStateHome';
import {
  setCategoryData,
  setSelectCat,
  setLocationData,
  setPage,
  setCountryData,
  setSelectLoc,
  setSelectCou,
  setEventDetail,
  eventDetailLoading,
  eventDetailLoaded,
 } from '../actions/home.action';

export const initialState: InterfaceStateHome = {
  categories: null,
  locations: null,
  countries: [],
  selectCat: null,
  selectLoc: null,
  selectCou: null,
  page: 1,
  eventDetail: null,
  loadingEventDetail: false
};

export const homeReducer = createReducer(initialState,
  on(setCategoryData, (state, {categories}) => ({...state, categories})),
  on(setLocationData, (state, {locations}) => ({...state, locations})),
  on(setCountryData, (state, {countries}) => ({...state, countries})),
  on(setSelectCat, (state, {selectCat}) => ({...state, selectCat})),
  on(setSelectLoc, (state, {selectLoc}) => ({...state, selectLoc})),
  on(setSelectCou, (state, {selectCou}) => ({...state, selectCou})),
  on(setPage, (state, {page}) => ({...state, page})),
  on(setEventDetail, (state, {eventDetail}) => ({...state, eventDetail})),
  on(eventDetailLoading, (state) => ({...state, loadingEventDetail: true})),
  on(eventDetailLoaded, (state) => ({...state, loadingEventDetail: false})),
);

export function reducer(state: InterfaceStateHome | undefined, action: Action) {
  return homeReducer(state, action);
}
