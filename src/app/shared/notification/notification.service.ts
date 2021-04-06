import { NgZone } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Notification } from './notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private zone: NgZone) {

  }
  private eventObs$ = new BehaviorSubject(new Notification());

  // getEvent = this.eventObs$.asObservable();
  getEvent(): Observable<Notification> {
    return this.eventObs$.asObservable();
  }

  resetEvent() {
    this.eventObs$.next(new Notification());
  }

  public showSuccess(message: string) {
    this.zone.run(() => {
      const data = new Notification();
      data.Message = message;
      data.IconClass = 'las la-check success';
      data.ShowNotification = true;
      this.eventObs$.next(data);
    });
  }

  public showError(message: string) {
    this.zone.run(() => {
      const data = new Notification();
      data.Message = message;
      data.IconClass = 'las la-times error';
      data.ShowNotification = true;
      this.eventObs$.next(data);
    });
  }

}
