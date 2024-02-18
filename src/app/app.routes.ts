import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'bnb',
		loadComponent: () => import('./bnb/bnb.component').then(m => m.BnbComponent)
	}
];
