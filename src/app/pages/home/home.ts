import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QrCodeComponent } from 'ng-qrcode';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { TruncatePipe } from '../../pipes/truncate-pipe';

@Component({
  selector: 'app-home',
  imports: [QrCodeComponent, FormsModule, NgxMaskDirective, TitleCasePipe, CurrencyPipe, DatePipe, TruncatePipe, NgxMaskPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  loginUser = {
      TeacherId: '',
      password: ''
    }

  constructor() {}
}

