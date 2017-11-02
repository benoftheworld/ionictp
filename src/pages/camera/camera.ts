import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { LocalNotifications } from '@ionic-native/local-notifications';

// Appel du template html + ajout d'un selecteur pour l'ensemble de la page
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})

export class CameraPage {

  	//déclaration des variables de classes
  	base64Image:String;
  	options: CameraOptions = {
   		quality: 100,
    		destinationType: this.camera.DestinationType.DATA_URL,
    		encodingType: this.camera.EncodingType.JPEG,
    		mediaType: this.camera.MediaType.PICTURE
  	};

  	//Constructeur de la classe Camera
  	constructor(private camera: Camera, public alertCtrl : AlertController, private plt : Platform, public navCtrl: NavController, private base64ToGallery : Base64ToGallery, private localNotifications: LocalNotifications) {
      this.plt.ready().then((rdy) => {
        this.localNotifications.on('click', (notification, state) => {
          let json = JSON.parse(notification.data);
          let alert = this.alertCtrl.create({
            title: notification.title,
            subTitle : json.mydata
          });
          alert.present();
        })
      })
    }

  	// fonction qui permet de démarrer la caméra + d'enregistrer une image dans la gallerie du téléphone
  	runCamera(){
  		this.camera.getPicture(this.options).then((imageData) => {
    	 	// imageData is either a base64 encoded string or a file URI
    	 	// If it's base64:
    	 	this.base64Image = 'data:image/jpeg;base64,' + imageData;
    	 	this.base64ToGallery.base64ToGallery(imageData, { prefix: '_img' }).then(
      			res => console.log('Saved image to gallery ', res),
      			err => console.log('Error saving image to gallery ', err)
    		)
        this.localNotifications.schedule({
          id : 1,
          title : 'Bravo le veau',
          text : 'Votre photo a été enregistré avec succès',
          at : new Date(new Date().getTime() + 3600),
          led : '00FF00',
          data : {mydata : 'My Hidden message this is'}
        })
  		}, (err) => {
  	 	// Handle error

  		});
  	}

}
