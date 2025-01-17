const audio = document.getElementById('audio');
const playButton = document.getElementById('play-button');
const trackTimeline = document.getElementById('track-timeline');
const tracks = document.querySelectorAll('.track');
const currentTimeDisplay = document.getElementById('current-time');
const totalDurationDisplay = document.getElementById('total-duration');
const volumeControl = document.getElementById('volume-control');

let currentTrackIndex = -1;

tracks.forEach((track, index) => {
    track.addEventListener('click', () => {
        if (currentTrackIndex !== index) {
            currentTrackIndex = index;
            loadTrack(track.dataset.audio);
            playTrack();
        } else {
            togglePlay();
        }
    });
});

function loadTrack(track) {
    audio.src = track;
    trackTimeline.value = 0;
    audio.currentTime = 0;
    audio.addEventListener('loadedmetadata', () => {
        totalDurationDisplay.textContent = formatTime(audio.duration);
    });
}

function playTrack() {
    audio.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
}

function togglePlay() {
    if (audio.paused) {
        playTrack();
    } else {
        audio.pause();
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    }
}

playButton.addEventListener('click', togglePlay);

audio.addEventListener('timeupdate', () => {
    trackTimeline.value = (audio.currentTime / audio.duration) * 100;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

trackTimeline.addEventListener('input', () => {
    const newTime = (trackTimeline.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

audio.addEventListener('ended', () => {
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    trackTimeline.value = 0;
    currentTimeDisplay.textContent = '0:00';
});

volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value / 100;
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
