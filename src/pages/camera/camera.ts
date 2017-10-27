import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {
    selectedItem:any;
    base64Image:String;

  constructor(public navCtrl: NavController, public navParams : NavParams, private camera : Camera) {
      this.selectedItem = navParams.get("item");
  }

  runCamera(event){
    console.log("crash");
    this.camera.getPicture({
      quality : 100,
      destinationType : this.camera.DestinationType.DATA_URL,
      encodingType : this.camera.EncodingType.JPEG,
      mediaType : this.camera.MediaType.PICTURE
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg; base64,' + imageData;
    }, (err) =>{
    });
  }
}
