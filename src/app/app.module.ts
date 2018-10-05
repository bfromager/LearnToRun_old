import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import { AppComponent } from './app.component';
import { DebugPage } from '../pages/debug/debug';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';
import {File} from '@ionic-native/file';


import {Mp3ListService} from "./music/mp3List/mp3list.service";
import {MediaPlayerService} from "./seance/mediaplayer/mediaPlayer.service";
import {MediaServiceFactory} from "./music/media/media.service.factory";
import {PlaylistsServiceFactory} from "./music/playlist/playlists.service.factory";
import {VocalService} from "./seance/alarm/vocal/vocal.service";
import {WaveService} from "./seance/alarm/wave/wave.service";
import {AlarmService} from "./seance/alarm/alarm.service";
import {Mp3ListComponent} from "./music/mp3List/mp3List.component";
import {CountDownComponent} from "./seance/countdown/countDown.component";
import {SeanceComponent} from "./seance/seance.component";

@NgModule({
  declarations: [
    AppComponent,
    DebugPage,
    ListPage,
    CountDownComponent,
    SeanceComponent,
    Mp3ListComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponent),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    DebugPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundMode,
    File,

    PlaylistsServiceFactory,
    MediaServiceFactory,

    Mp3ListService,

    MediaPlayerService,
    AlarmService,
    VocalService,
    WaveService,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
