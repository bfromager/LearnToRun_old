import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
// import {MediaService} from "./music/media.service";
// import {Mp3ListService} from "./music/mp3list.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  //private mediaService: MediaService;

  constructor(public platform: Platform
            , public statusBar: StatusBar
            , public splashScreen: SplashScreen
            , private backgroundMode: BackgroundMode
             )
  {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {

      console.log(this.platform.platforms())

      // let s = "";
      // for (let p of this.platform.platforms()) {
      //   s += p + " / ";
      // }
      // alert(s);

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.backgroundMode.enable();
      this.backgroundMode.disableWebViewOptimizations();
      //this.backgroundMode.overrideBackButton();
      // this.backgroundMode.on("activate").subscribe(()=> {
      //
      // });

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
