import throttle from "lodash.throttle";

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const LOCALSTORAGE_KEY = "videoplayer-current-time";

const OnThrottleVideoPlayerTime = throttle(savePlaybackTime, 1000);

player.on('timeupdate', OnThrottleVideoPlayerTime);

function savePlaybackTime(currentTime) {
    const currentTimeJSON = JSON.stringify(currentTime.seconds)
    localStorage.setItem(LOCALSTORAGE_KEY, currentTimeJSON);
}

function setCurrentTime() {
    const getCurrentTime = localStorage.getItem(LOCALSTORAGE_KEY);
    const parsedCurrentTime = JSON.parse(getCurrentTime)

    player.setCurrentTime(parsedCurrentTime)
}

setCurrentTime();

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});