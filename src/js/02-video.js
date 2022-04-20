import throttle from "lodash.throttle";

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const LOCALSTORAGE_KEY = "videoplayer-current-time";

const throttleOnVideoPlayerTime = throttle(savePlaybackTime, 1000);

player.on('timeupdate', throttleOnVideoPlayerTime);

function savePlaybackTime(currentTime) {
    const currentTimeJSON = JSON.stringify(currentTime.seconds)
    localStorage.setItem(LOCALSTORAGE_KEY, currentTimeJSON);
}

function setCurrentTime() {
    const getTIme = localStorage.getItem(LOCALSTORAGE_KEY);

    player.setCurrentTime(getTIme);
}

setCurrentTime();

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});