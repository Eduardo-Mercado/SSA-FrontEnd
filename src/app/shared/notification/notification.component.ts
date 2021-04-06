import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notification } from './notification.model';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit {

  noti: Notification;

  constructor(private notificationServ: NotificationService) {

  }

  ngOnInit() {
    this.noti = new Notification();
    this.notificationServ.getEvent().subscribe((data: Notification) => {
      this.noti = data;
    });

  }

  public hide_event() {
    this.notificationServ.resetEvent();
  }

}
