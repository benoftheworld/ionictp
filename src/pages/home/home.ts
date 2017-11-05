/**
 * @author <benjamin.martin@ynov.com>
 * @version 1.0
 * @file Controller accueil
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Décorateur Component qui définit le template html à utliser et définition d'un selecteur
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

/**
 * Définition de la classe HomePage
 */
export class HomePage {

	name: String = "NameApp";
	app: any = {name:String, version:Number}
  constructor(public navCtrl: NavController) {
  		this.app.name= "Benoftheworld App";
  		this.app.version = 1.0;
  }

}
