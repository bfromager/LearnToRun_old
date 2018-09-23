import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import { AppComponent } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';
import {File} from '@ionic-native/file';


import {TimerComponent} from "./timer/timer.component";
import {Mp3ListService} from "./music/mp3list.service";
import {MediaPlayerService} from "./music/mediaPlayer.service";
import {MediaServiceFactory} from "./media/media.service.factory";
import {PlaylistsServiceFactory} from "./music/playlist/playlists.service.factory";
import {VocalService} from "./vocal/vocal.service";

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    ListPage,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponent),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundMode,
    File,
    PlaylistsServiceFactory,
    MediaServiceFactory,
    MediaPlayerService,
    Mp3ListService,
    VocalService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
