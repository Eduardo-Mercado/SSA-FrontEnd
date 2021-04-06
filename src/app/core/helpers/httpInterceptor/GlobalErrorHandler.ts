import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {
    const notifier = this.injector.get(NotificationService);
    notifier.showError('globalerrorhandler: ' + error);

  }
}
