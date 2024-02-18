import { Injectable } from '@angular/core';
import { environment as env } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as crypto from 'crypto-js';

@Injectable({
	providedIn: 'root'
})
export class CybersourceService {

	constructor(private http: HttpClient) { }

	createPayment(signedFields: Map<string, string>): Observable<any> {
		// used or not depending on the implemented flow
		// const dataToSign: string = this.buildDataToSign(signedFields);
		// const signature = crypto.HmacSHA256(dataToSign, env.cybersource.secretKey).toString(crypto.enc.Base64);
		const parameters = new Map([...signedFields.entries()].sort());
		const url = this.getUrlWithParameters(env.cybersource.url, parameters);
		let body: { [key: string]: string } = {};
		signedFields.forEach((value: any, key: any) => body[key] = value);
		return this.http.post(url, body);
	}

	getUrlWithParameters(url: string, parameters: Map<string, any>): string {
		url += parameters.size > 0 ? '?' : '';
		parameters.forEach((value, key) => url += key + '=' + value + '&');
		url = parameters.size > 0 ? url.slice(0, -1) : url
		return url;
	}

	buildDataToSign(params: Map<string, string>): string {
		const dataToSign = new Array<string>();
		const signedFieldNames = (params.get('signed_field_names') || '').split(',');
		signedFieldNames.forEach((field: string) => dataToSign.push(field + '=' + params.get(field)));
		return dataToSign.join(',');
	}


}