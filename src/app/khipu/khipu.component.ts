import { Component, OnInit } from '@angular/core';
import { KhipuService } from './khipu.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-khipu',
  standalone: true,
  imports: [HttpClientModule],
	providers: [KhipuService],
  templateUrl: './khipu.component.html',
  styleUrl: './khipu.component.sass'
})
export class KhipuComponent implements OnInit {

	constructor(private khipu: KhipuService) { }

	ngOnInit() {
		// this.testCreatePayment();
	}
	
	testCreatePayment() {
		this.khipu.createPayment('Test Payment Subject', 20, 'someRandomTransactionID');
	}

}
