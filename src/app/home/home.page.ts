import {Component, OnInit} from '@angular/core';
import {AudioPlayerService} from '../services/audio-player.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentAudio: string = 'metronome';
  audios: any[] = [
    {
      name: 'metronome',
      file: 'assets/audios/metronome.wav',
    },
    {
      name: 'clack',
      file: 'assets/audios/clack.wav',
    },
    {
      name: 'drum',
      file: 'assets/audios/drum.wav',
    },
    {
      name: 'click',
      file: 'assets/audios/click.wav',
    },
  ];

  constructor(public audioPlayer: AudioPlayerService) {

  }

  ngOnInit(): void {
    this.audioPlayer.preload(this.audios[0].name, this.audios[0].file);
  }

  audioSelected(event: CustomEvent) {
    const audio = this.audios.find(x => event.detail.value === x.name);
    this.audioPlayer.preload(audio.name, audio.file);
  }
}
