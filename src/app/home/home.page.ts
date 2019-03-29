import {Component, OnInit} from '@angular/core';
import {AudioPlayerService} from '../services/audio-player.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public audioPlayer: AudioPlayerService) {

  }

  ngOnInit(): void {

  }
}
