import {Component, Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {MessagesComponent} from './messages.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) {
  }

  openMessage(msg: string) {
    this.snackBar.open(msg, '', {
      panelClass: ['background-red']
    });
  }
}
