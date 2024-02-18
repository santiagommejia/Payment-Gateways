import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'bnb',
		loadComponent: () => import('./bnb/bnb.component').then(m => m.BnbComponent)
	},
	{
		path: 'cybersource',
		loadComponent: () => import('./cybersource/cybersource.component').then(m => m.CybersourceComponent)
	},
	{
		path: 'libelula',
		loadComponent: () => import('./libelula/libelula.component').then(m => m.LibelulaComponent)
	},
	{
		path: 'khipu',
		loadComponent: () => import('./khipu/khipu.component').then(m => m.KhipuComponent)
	}
];
