import { Component, OnInit } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import {HomeComponent} from './home.component';
import {VilleDetailComponent} from './ville.detail.component';
import {MapComponent} from './map.component';

@Component({
	selector: 'my-app',
	template: `
	  <div class="titre">
	  	<h1 class="text-center">Bienvenus dans Urban Bus</h1>
	  </div>
 	  <div class="corps">
	    <router-outlet></router-outlet>
	  </div>
	`,
  	styleUrls: ['app/css/style.css'],
	directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
	{
		path: '/home',
		name: 'Home',
		component: HomeComponent, 
		useAsDefault: true
	},
	{
		path: '/detail',
		name: 'VilleDetail',
		component: VilleDetailComponent
	},
	{
		path: '/map',
		name: 'Map',
		component: MapComponent
	}
])

export class AppComponent {

}
