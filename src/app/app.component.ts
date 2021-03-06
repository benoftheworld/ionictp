/**
 * @author <benjamin.martin@ynov.com>
 * @version 1.0
 * @file Composant racine de l'application
 */
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Base64ToGallery} from '@ionic-native/base64-to-gallery';
import { HomePage } from '../pages/home/home';
import { CameraPage } from '../pages/camera/camera';


/**
 * Décorateur Component qui définit le template html à utliser
 */
@Component({
  templateUrl: 'app.html'
})

/**
 * Class MyApp
 */
export class MyApp {

  /**
   * Déclaration des variables
   */
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  /**
   * @constructor - Constructeur de la classe
   *
   * @param  public platform: Platform
   * @param  public statusBar: StatusBar
   * @param  public splashScreen: SplashScreen
   */
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Camera', component : CameraPage}
    ];
  }

  /**
   * initializeApp - Initialisation de l'application
   */
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   * openPage - Ouvre une page
   * @param page
   */
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
