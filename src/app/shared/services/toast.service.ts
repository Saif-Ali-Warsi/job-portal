import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastMessage = new Subject<string>();

  show(message: string) {
    this.toastMessage.next(message)
  }

}
