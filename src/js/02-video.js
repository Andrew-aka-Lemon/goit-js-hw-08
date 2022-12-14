import Vimeo from '@vimeo/player';
// import throttle from 'lodash.throttle';
import Throttle from 'lodash.throttle';

const VIDEO_CURRENT_TIME_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);

setVideoTime();
// console.log(localStorage.getItem(VIDEO_CURRENT_TIME_KEY));

player.on('timeupdate', Throttle(saveCurrentVideoTime, 1000, { leading: false }));

function saveCurrentVideoTime(info) {
  localStorage.setItem(VIDEO_CURRENT_TIME_KEY, info.seconds);
  // console.log(info);
}

function setVideoTime() {
  if (!localStorage.getItem(VIDEO_CURRENT_TIME_KEY)) {
    return;
  }
  player.setCurrentTime(localStorage.getItem(VIDEO_CURRENT_TIME_KEY));
}
