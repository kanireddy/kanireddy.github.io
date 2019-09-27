import { InterfaceStateHome } from './InterfaceStateHome';
import { EventState } from '../reducers/event.reducer';

export interface InterfaceState {
    home: InterfaceStateHome;
    events: EventState;
}
