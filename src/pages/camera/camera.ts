/**
* @author <benjamin.martin@ynov.com>
* @version 1.0
* @file Controller camera
*/
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

/**
* Décorateur Component qui définit le template html à utliser et définition d'un selecteur
*/
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})

/**
* Définition de la classe CaméraPage
*/
export class CameraPage {

  /**
  * Déclaration des variables de la classe
  */
  base64Image:String;
  videoUrl : String;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  /**
  * @constructor
  *
  * @param  private camera: Camera
  * @param  public alertCtrl : AlertController
  * @param  private plt : Platform
  * @param  public navCtrl: NavController
  * @param  private base64ToGallery : Base64ToGallery
  * @param  private localNotifications: LocalNotifications
  */
  constructor(private mediaCapture: MediaCapture, private camera: Camera, public alertCtrl : AlertController, private plt : Platform, public navCtrl: NavController, private base64ToGallery : Base64ToGallery, private localNotifications: LocalNotifications) {
    this.plt.ready().then((rdy) => {
      this.localNotifications.on('click', (notification, state) => {
        let json = JSON.parse(notification.data);
        let alert = this.alertCtrl.create({
          title: notification.title,
          subTitle : json.mydata
        });
        alert.present();
      });
    });
  }

  /**
  * Méthode runCaméra qui permet de prendre une image et de l'enregistrer dans la galerie
  */
  runCamera(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.base64ToGallery.base64ToGallery(imageData, { prefix: '_img' }).then(
        res => console.log('Image enregistre avec succes', res),
        err => console.log('Erreur dans la sauvegarde en galerie', err)
      );

      //Definition des paramètres du système de notification
      this.localNotifications.schedule({
        id : 1,
        title : 'Bravo le veau',
        text : 'Notification',
        at : new Date(new Date().getTime() + 3600),
        data : {mydata : 'data'}
      });
    }, (err) => {

    });
  }

  runVideo(){
    let options: CaptureImageOptions = { limit: 3 };
    this.mediaCapture.captureImage(options)
      .then(
        (data: MediaFile[]) => {
          this.videoUrl = data[0].fullPath; // On recupère le chemin de la video
        },
        (err: CaptureError) => console.error(err)
      );
  }
}
