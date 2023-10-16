import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  message: string = '';
  isVisible: boolean = false;

  showNotification(message: string) {
    this.message = message;
    this.isVisible = true;
    setTimeout(() => {
      this.hideNotification();
    }, 3000); // Hide after 3 seconds (adjust as needed)
  }

  hideNotification() {
    this.isVisible = false;
  }
}
