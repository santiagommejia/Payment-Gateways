import { Component } from '@angular/core';
import { CybersourceService } from './cybersource.service';
import { HttpClientModule } from '@angular/common/http';
import { environment as env } from '@environments/environment';
import { tap } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-cybersource',
  standalone: true,
	providers: [CybersourceService],
  imports: [HttpClientModule],
  templateUrl: './cybersource.component.html',
  styleUrl: './cybersource.component.sass'
})
export class CybersourceComponent {

	constructor(private cybersource: CybersourceService) { }

	ngOnInit() {
		// this.createPayment();
	}

	createPayment() {
    const uniqueID = uuid();
    const now = new Date().toISOString();
    const signed_field_names = 'bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code,access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,reference_number,transaction_type,amount,currency';
    const unsigned_field_names = '' ;
    const signed_date_time = now.split('.')[0]+"Z";
    const locale = 'en';
    const reference_number = uniqueID;
    const transaction_type = 'create_payment_token';
    const amount = '10';
    const currency = 'bs';
    // send this fields in the request to prefill form data
    const bill_to_forename = 'test_forename';
    const bill_to_surname = 'test_surname';
    const bill_to_email = 'test_email';
    const bill_to_phone = 'test_phone';
    const bill_to_address_line1 = 'test_address_line1';
    const bill_to_address_city = 'test_address_city';
    const bill_to_address_state = 'test_address_state';
    const bill_to_address_country = 'test_address_country';
    const bill_to_address_postal_code = 'test_address_postal_code';

    const signedFields = new Map<string,string>();
    signedFields.set('access_key',env.cybersource.accessKey);
    signedFields.set('profile_id',env.cybersource.profileId);
    signedFields.set('transaction_uuid',uniqueID);
    signedFields.set('signed_field_names',signed_field_names);
    signedFields.set('unsigned_field_names',unsigned_field_names);
    signedFields.set('signed_date_time',signed_date_time);
    signedFields.set('locale',locale);
    signedFields.set('reference_number',reference_number);
    signedFields.set('transaction_type',transaction_type);
    signedFields.set('amount',amount);
    signedFields.set('currency',currency);
    signedFields.set('bill_to_forename',bill_to_forename);
    signedFields.set('bill_to_surname',bill_to_surname);
    signedFields.set('bill_to_email',bill_to_email);
    signedFields.set('bill_to_phone',bill_to_phone);
    signedFields.set('bill_to_address_line1',bill_to_address_line1);
    signedFields.set('bill_to_address_city',bill_to_address_city);
    signedFields.set('bill_to_address_state',bill_to_address_state);
    signedFields.set('bill_to_address_country',bill_to_address_country);
    signedFields.set('bill_to_address_postal_code',bill_to_address_postal_code);
    
    this.cybersource.createPayment(signedFields).pipe(
			tap((response: any) => console.log('response', response))
		).subscribe();
}

}
