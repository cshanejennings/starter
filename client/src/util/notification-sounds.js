import { URI_BASE } from './server-connection';
const src = `${URI_BASE}/alerts/chirp1.mp3`;
const incoming_player = new Audio(src);

const AUDIO = {
  initiated: false,
  muted: true
};



const initiate = () => {
  incoming_player.play();
  incoming_player.pause();
  AUDIO.initiated = true;
}

export const toggle_audio = () => {
  AUDIO.muted = !AUDIO.muted;
  if (!AUDIO.initiated) {
    initiate();
  }
  return AUDIO.muted;
}

export const play_incoming = () => {
  if (!AUDIO.muted) {
    incoming_player.play();
  }
}

export const play_outgoing = () => {
  if (!AUDIO.muted) {
    incoming_player.play();
  }
}
