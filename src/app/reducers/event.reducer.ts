import { Action, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Event } from '../interfaces/event';
import * as EventActions from '../actions/event.action';

export interface EventState extends EntityState<Event> {
    // additional entities state properties
    selectedEventId: number | null;
    moreEvents: boolean;
}

export const adapter: EntityAdapter<Event> = createEntityAdapter<Event>();

export const initialState: EventState = adapter.getInitialState({
    // additional entity state properties
    selectedEventId: null,
    moreEvents: false,
});

const EventReducer = createReducer(
    initialState,
    on(EventActions.addEvent, (state, { event }) => adapter.addOne(event, state)),
    on(EventActions.upsertEvent, (state, { event }) => adapter.upsertOne(event, state)),
    on(EventActions.addEvents, (state, { events }) => adapter.addMany(events, state)),
    //  on(EventActions.upsertEvents, (state, { events }) => {
    //    return adapter.upsertEvents(Events, state);
    //  }),
    on(EventActions.updateEvent, (state, { event }) => adapter.updateOne(event, state)),
    on(EventActions.updateEvents, (state, { events }) => adapter.updateMany(events, state)),
    on(EventActions.mapEvents, (state, { entityMap }) => adapter.map(entityMap, state)),
    on(EventActions.deleteEvent, (state, { id }) => adapter.removeOne(id, state)),
    on(EventActions.deleteEvents, (state, { ids }) => adapter.removeMany(ids, state)),
    on(EventActions.deleteEventsByPredicate, (state, { predicate }) => adapter.removeMany(predicate, state)),
    on(EventActions.loadEvents, (state, { events }) => adapter.addAll(events, state)),
    on(EventActions.clearEvents, state => adapter.removeAll({ ...state, selectedEventId: null })),
    on(EventActions.moreEvents, state => ({...state, moreEvents: true})),
    on(EventActions.noMoreEvents, (state) => ({...state, moreEvents: false})),
);

export function reducer(state: EventState | undefined, action: Action) {
    return EventReducer(state, action);
}

export const getSelectedEventId = (state: EventState) => state.selectedEventId;
export const getMoreEvents = (state: EventState) => state.moreEvents;

export const selectEventState = createFeatureSelector<EventState>('events');

export const selectMoreEvents = createSelector(
    selectEventState,
    getMoreEvents
);


// get the selectors
const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors(
    selectEventState
);

// select the array of Event ids
export const selectEventIds = selectIds;

// select the dictionary of Event entities
export const selectEventEntities = selectEntities;

// select the array of Events
export const selectAllEvents = selectAll;

// select the total Event count
export const selectEventTotal = selectTotal;
