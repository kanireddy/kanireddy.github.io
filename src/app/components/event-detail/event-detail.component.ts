import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MainService } from '../../services/main.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { InterfaceState } from 'src/app/interfaces/InterfaceState';
import { Observable } from 'rxjs';
import { selectHomeState } from '../../reducers/index';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  homeState$: Observable<any>;

  private eventId: number;
  eventDetail: any = null;
  loadingEventDetail;
  bannerLoaded = false;

  mapsUrl: SafeResourceUrl = '';

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    private store: Store<InterfaceState>,
    public sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {
    this.homeState$ = this.store.pipe(select(selectHomeState));
  }

  ngOnInit() {
    this.route.paramMap.subscribe ( (paramMap: ParamMap) => {
      this.eventId = +paramMap.get('eventId');
      this.mainService.getEventDetail(this.eventId);
    });
    this.homeState$.subscribe( homeState => {
      if (!!homeState.eventDetail) {
        this.eventDetail = homeState.eventDetail;
        this.mapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                    'https://www.google.com/maps/embed/v1/place?key=AIzaSyCePmcdBvvoT6_NgWrQ0_RncRU6nyZu9c8&q='
                    + encodeURIComponent(!!homeState.eventDetail ? homeState.eventDetail.venueName : null) );
        this.loadingEventDetail = homeState.loadingEventDetail;
        console.log(homeState.loadingEventDetail);
      }
    });
  }

  openXl(content) { this.modalService.open(content, {size: 'xl'}); }

}
