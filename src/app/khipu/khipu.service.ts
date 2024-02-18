import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@environments/environment'
import { Observable, map } from 'rxjs';
import * as crypto from 'crypto-js';

@Injectable({
	providedIn: 'root'
})
export class KhipuService {

	constructor(private http: HttpClient) { }

	createPayment(subject: string, amount: number, transactionId: string): Observable<any> {
		let parameters = this.getBasePaymentParameters(transactionId);
		const method = 'POST';
		parameters.set('amount', amount);
		parameters.set('currency', 'BOB');
		parameters.set('subject', subject);
		parameters = new Map([...parameters.entries()].sort());
		const toSign = method.toUpperCase() + '&' + encodeURIComponent(env.khipu.url);
		const url = this.getUrlWithParameters(env.khipu.url, parameters);
		const toSignUrl = this.getToSignUrl(toSign, parameters);
		const hash = crypto.HmacSHA256(toSignUrl, env.khipu.secret);
		const headers = { 'Authorization': env.khipu.receiverId + ':' + hash }
		return this.http.post(url, null, { headers: headers }).pipe(
			map((response: any) => {
				const jsonResponse = JSON.parse(response.body);
				if (!jsonResponse.hasOwnProperty('status')) {
					const response = this.getResponse(
						200,
						'success',
						{
							'payment_url': jsonResponse['payment_url'],
							'app_url': jsonResponse['app_url'],
							'pay_me_url': jsonResponse['pay_me_url'],
							'payment_id': jsonResponse['payment_id'],
							'transaction_id': parameters.get('transaction_id')
						}
					);
					return response;
				}
				return null;
			})
		);
	}

	getPayment(notificationToken: string): Observable<any> {
		const method = 'GET';
		const parameters = new Map<string, string>();
		parameters.set('notification_token', notificationToken);
		const toSign = method.toUpperCase() + '&' + encodeURIComponent(env.khipu.url);
		const url = this.getUrlWithParameters(env.khipu.url, parameters);
		const toSignUrl = this.getToSignUrl(toSign, parameters);
		const hash = crypto.HmacSHA256(toSignUrl, env.khipu.secret);
		const headers = { 'Authorization': env.khipu.receiverId + ':' + hash }
		return this.http.get(url, { headers: headers }).pipe(
			map((response: any) => JSON.parse(response.body))
		);
	}

	private getToSignUrl(toSign: string, parameters: Map<string, any>): string {
		let newUrl = toSign;
		parameters.forEach((value, key) => {
			newUrl += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(value);
		});
		return newUrl;
	}

	private getUrlWithParameters(url: string, parameters: Map<string, any>): string {
		url += parameters.size > 0 ? '?' : '';
		parameters.forEach((value, key) => url += key + '=' + value + '&');
		url = parameters.size > 0 ? url.slice(0, -1) : url
		return url;
	}

	private getBasePaymentParameters(transactionId: string): Map<string, any> {
		const parameters = new Map<string, any>();
		parameters.set('transaction_id', transactionId);
		parameters.set('notify_url', env.khipu.notifyUrl);
		parameters.set('return_url', env.khipu.returnUrl);
		parameters.set('cancel_url', env.khipu.cancelUrl);
		parameters.set('notify_api_version', env.khipu.apiVersion);
		return parameters;
	}

	private getResponse(status: number, message: string, params?: any) {
		return { status, message, payload: params }
	}

}

