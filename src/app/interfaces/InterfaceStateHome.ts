import { Category } from './category';
import { Event } from './event';
import { Location } from './location';
import { Country } from './country';

export interface InterfaceStateHome {
    categories: Category[];
    locations: Location[];
    countries: Country[];
    selectCat: Category;
    selectLoc: Location;
    selectCou: Country;
    page: number;
    eventDetail: any;
    loadingEventDetail: boolean;
}
