import { Injectable } from '@angular/core';
import {NativeAudio} from '@ionic-native/native-audio/ngx';
import {Platform} from '@ionic/angular';
import {Observable, Subscription, timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private audioType: string = 'html5';
  private sounds: any = [];
  timer: Observable<any>;
  private timerSubscription: Subscription;

  constructor(private nativeAudio: NativeAudio,
              private platform: Platform) {

    if (platform.is('cordova')) {
      this.audioType = 'native';
    }
  }

  preload(key: string, asset: string) {
    const isNative = (this.audioType !== 'html5');
    const audio = {
      key: key,
      asset: isNative ? key : asset,
      type: isNative ? 'native' : 'html5'
    };

    this.sounds.push(audio);

    if (isNative) {
      this.nativeAudio.preloadSimple(key, asset);
    }
  }

  play(key: string) {
    const audio = this.sounds.find(sound => sound.key === key);
    this.timer = timer(0, 1000);
    if (audio.type === 'html5') {
      const audioAsset = new Audio(audio.asset);
      this.timerSubscription = this.timer.subscribe(() => audioAsset.play());
    } else {
      this.timerSubscription = this.timer.subscribe(() => this.nativeAudio.play(audio.asset));
    }
  }

  stop() {
    this.timerSubscription.unsubscribe();
    this.timer = null;
  }
}
