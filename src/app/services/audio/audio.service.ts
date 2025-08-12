import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioUnlocked = false;

  setAudioUnlocked() {
    this.audioUnlocked = true;
  }

  isAudioUnlocked(): boolean {
    return this.audioUnlocked;
  }
}
