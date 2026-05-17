import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {


  message = '';

  showToast = false;

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.toastMessage.subscribe((message: any) => {
      this.message = message;
      this.showToast = true;

      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    })
  }

}
