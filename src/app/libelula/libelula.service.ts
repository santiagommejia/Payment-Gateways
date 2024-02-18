import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LibelulaService {

	constructor(private http: HttpClient) { }

	createPayment(
		email_cliente: string,
		identificador: string,
		nombre_cliente: string,
		descripcion: string,
		lineas_detalle_deuda: Array<Object>,
		razon_social: string,
		codigo_tipo_documento: string,
		nit: string
	): Observable<any> {
		const headers = { 'Content-Type': 'application/json' };
		const body = JSON.stringify({
			appkey: env.libelula.appKey,
			email_cliente,
			identificador,
			callback_url: env.libelula.callbackUrl,
			url_retorno: env.libelula.returnUrl,
			descripcion,
			nombre_cliente,
			lineas_detalle_deuda,
			emite_factura: 1,
			codigo_tipo_documento,
			razon_social,
			nit
		});
		return this.http.post(env.libelula.url, body, { headers });
	}

}
