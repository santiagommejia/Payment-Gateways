import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment as env } from '@environments/environment';

export interface BNBResponse {
	success: boolean;
	message: string;
	id: number;
	qr: string;
	expirationDate?: string;
	statusId?: number;
}

export interface QR {
	id: number;
	qrBytes: string;
}

@Injectable({ providedIn: 'root' })
export class BNBPaymentService {

	token: string;

	constructor(private http: HttpClient) { }

	loadToken(): Observable<void> {
		const url = `${env.bnb.api}auth/token`;
		const body = { username: env.bnb.accountId, password: env.bnb.authorizationId };
		return this.http.post<BNBResponse>(url, body).pipe(
			map((bnbResponse: BNBResponse) => {
				if (bnbResponse.success) this.token = bnbResponse.message
				else throw new Error();
				return;
			})
		);
	}

	// IMPORTANT: You should only call this method ONCE, and then replace the authorizationId in the environments file with the newAuthorizationId
	async updateCredentials(): Promise<boolean | null> {
		if (!this.token) return null;
		const newAuthorizationId = this.getRandomAuthenticationId();
		const url = `${env.bnb.api}auth/UpdateCredentials`;
		const body = {
			AccountId: env.bnb.accountId,
			actualAuthorizationId: env.bnb.authorizationId,
			newAuthorizationId
		};
		const bnbResponse: BNBResponse = await this.http.post<BNBResponse>(url, body, { headers: this.getHeaders() }).toPromise() as BNBResponse;
		return bnbResponse.success;
	}

	getQRWithImageAsync(gloss: string, amount: number, isSingleUse: boolean): Observable<QR> {
		if (!this.token) throw new Error('No token');
		const url = `${env.bnb.api}main/getQRWithImageAsync`;
		const body = { currency: 'BOB', gloss, amount, isSingleUse, expirationDate: this.getExpirationDate() };
		return this.http.post<BNBResponse>(url, body, { headers: this.getHeaders() }).pipe(
			map((bnbResponse: BNBResponse) => {
				if (bnbResponse.success) {
					return { id: bnbResponse.id, qrBytes: bnbResponse.qr } as QR;
				} else {
					throw new Error('Error getting QR with image');
				}
			})
		);
	}

	getQRStatusAsync(qrId: number): Observable<string> {
		if (!this.token) throw new Error('No token');
		const url = `${env.bnb.api}main/getQRStatusAsync`;
		return this.http.post<BNBResponse>(url, { qrId }, { headers: this.getHeaders() }).pipe(
			map((bnbResponse: BNBResponse) => {
				if (bnbResponse.success && bnbResponse.statusId) {
						switch (bnbResponse.statusId) {
							case 1: return 'unused';
							case 2: return 'used';
							case 3: return 'expired';
							default: throw new Error('Invalid statusId');
						}
				} else throw new Error('Error getting QR status');
			})
		);
	}

	private getHeaders(): HttpHeaders {
		const headers: HttpHeaders = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		if (this.token) headers.append('Authorization', `Bearer ${this.token}`);
		return headers;
	}

	// full Authentication Id must contain:
	// - At least a length of 15 chars
	// - At least one letter
	// - At least a number
	// - At least a special character:  +, -, /, *, $, <, >, !, ¡, #, |, =
	private getRandomAuthenticationId(): string {
		const randomCharsToMeetIdRequisites: string = 'a*b!1';
		const randomAuthId = randomCharsToMeetIdRequisites + new Date().getTime().toString();
		console.log('randomAuthId', randomAuthId); // IMPORTANT: SAVE THIS PASSWORD!!!
		return randomAuthId;
	}

	private getExpirationDate() {
		const now = new Date().getTime();
		const oneDayInMs: number = 86400000;
		const tomorrow = new Date(now + oneDayInMs);
		return tomorrow.toISOString().split('T')[0]; // this format should always be yyyy-mm-dd
	}

}