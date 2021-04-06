export class Notification {
  public Message: string;
  public IconClass: string;
  public ShowNotification: boolean;

  constructor() {
    this.ShowNotification = false;
    this.Message = '';
    this.IconClass = '';
  }
}
