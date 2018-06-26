import {Injectable} from '@angular/core';

import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  messages: string[] = [];

  constructor(private toastr: ToastrService) {}

  succesToastr(message: string) {
    this.toastr.success(message);
  }

  errorToastr(message: string) {
    this.toastr.error(message);
  }

}
