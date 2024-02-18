import { Component, OnInit } from '@angular/core';
import { BNBPaymentService, QR } from './bnb.service';
import { catchError, of, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bnb',
  standalone: true,
	imports: [CommonModule],
  providers: [BNBPaymentService],
  templateUrl: './bnb.component.html',
  styleUrl: './bnb.component.sass'
})
export class BnbComponent implements OnInit {

  qr: QR;
	qrBase64: string;

  constructor(private bnbPaymentService: BNBPaymentService) {}

  ngOnInit() { 
		// this.testBNBFlow();
	}

  async testBNBFlow(): Promise<void> {
    this.bnbPaymentService.loadToken().pipe(
			switchMap(() => {
				const gloss: string = 'test QR';
				const amount: number  = 10;
				const isSingleUse: boolean  = true;
				return this.bnbPaymentService.getQRWithImageAsync(gloss, amount, isSingleUse);
			}),
			tap((qr: QR) => {
				this.qr = qr;
				this.qrBase64 = `data:image/png;base64,${qr.qrBytes}`
			}),
			switchMap((qr: QR) => this.bnbPaymentService.getQRStatusAsync(qr.id)),
			tap((status: string) => console.log('status', status)),
			catchError((error: any) => {
				console.log('error', error);
				return of(null);
			})
		).subscribe();
  }

}