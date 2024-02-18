import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LibelulaService } from './libelula.service';

@Component({
  selector: 'app-libelula',
  standalone: true,
	providers: [LibelulaService],
  imports: [HttpClientModule],
  templateUrl: './libelula.component.html',
  styleUrl: './libelula.component.sass'
})
export class LibelulaComponent implements OnInit {

	constructor(private libelula: LibelulaService) { }
	
	ngOnInit() {
		// this.testCreatePayment();
	}

	testCreatePayment() {
		const clientEmail: string = 'test@email.com';
		const id: string = 'someRandomId';
		const clientName: string = 'Test Client';
		const description: string = 'Test Payment Subject';
		const debtDetailLine: Array<Object> = [];
		const socialReason: string = 'Full Name';
		const documentType: string = 'CI';
		const nit: string = '123456789';
		this.libelula.createPayment(clientEmail, id, clientName, description, debtDetailLine, socialReason, documentType, nit).subscribe();
	}

}
