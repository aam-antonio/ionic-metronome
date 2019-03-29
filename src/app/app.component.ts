import {Component, OnDestroy, ViewChild} from '@angular/core';
import {IonRouterOutlet, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {BackgroundMode} from '@ionic-native/background-mode/ngx';
import {AudioPlayerService} from './services/audio-player.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnDestroy {
  defaultLang: string = 'es';
  backButtonSubscription: Subscription;

  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

  constructor(private platform: Platform,
              private splashScreen: SplashScreen,
              private statusBar: StatusBar,
              private router: Router,
              private translate: TranslateService,
              private backgroundMode: BackgroundMode,
              private audioPlayer: AudioPlayerService) {
    this.initializeApp();
    this.registerBackButton();
    this.initializeTranslate();
  }

  ngOnDestroy(): void {
    this.backButtonSubscription.unsubscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.styleBlackOpaque();

      this.backgroundMode.setDefaults({silent: true});
      this.backgroundMode.enable();

      this.audioPlayer.preload('tempo', 'assets/audios/metronome.wav');
    });
  }

  initializeTranslate() {
    this.translate.setDefaultLang(this.defaultLang);
    const lang = this.translate.getBrowserLang();
    this.translate.use(lang ? lang : this.defaultLang);
    // this.translate.get('BACK').subscribe(value => this.config.set('backButtonText', value));
  }

  registerBackButton() {
    this.platform.backButton.subscribe(() => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else {
        this.backgroundMode.moveToBackground();
        // navigator['app'].exitApp();
      }
    });
  }
}
