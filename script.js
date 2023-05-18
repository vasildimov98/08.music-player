// Element select
const songArtist = document.getElementById("artist");
const songTitle = document.getElementById("title");
const songImage = document.getElementById("img");
const songAudio = document.getElementById("song");
const progressElem = document.getElementById("progress__line");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current");
const durationTimeEl = document.getElementById("end");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const play = document.getElementById("play");

// Global variables
let isSongPlaying = false;
let songIndex = 0;

const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Electric chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

// Function Declaration
function playSong() {
  isSongPlaying = true;
  play.classList.replace("fa-play", "fa-pause");
  play.setAttribute("title", "Pause");
  songAudio.play();
}

function pauseSong() {
  isSongPlaying = false;
  play.classList.replace("fa-pause", "fa-play");
  play.setAttribute("title", "Play");
  songAudio.pause();
}

function nextSong() {
  songIndex++;
  if (songIndex === songs.length) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Manipulate DOM
function loadSong(song) {
  songTitle.textContent = song.displayName;
  songArtist.textContent = song.artist;
  songAudio.src = `music/${song.name}.mp3`;
  songImage.src = `img/${song.name}.jpg`;
}

function updateProgress(e) {
  if (!isSongPlaying) return;
  // Calc progress
  const { duration, currentTime } = e.srcElement;
  const progress = (currentTime / duration) * 100;
  progressElem.style.width = `${progress}%`;
  // Calc duration and current time
  const currentMinutes = Math.floor(currentTime / 60);
  const currentLeft = Math.floor(currentTime % 60);
  const currentSeconds = currentLeft < 10 ? `0${currentLeft}` : currentLeft;
  if (currentSeconds) {
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }

  const durationMinutes = Math.floor(duration / 60);
  const durationLeft = Math.floor(duration % 60);
  const durationSeconds = durationLeft < 10 ? `0${durationLeft}` : durationLeft;
  if (durationSeconds) {
    const durationTime = `${durationMinutes}:${durationSeconds}`;
    durationTimeEl.textContent = durationTime;
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = songAudio;
  songAudio.currentTime = (clickX / width) * duration;
  if (!isSongPlaying) {
    playSong();
  }
}

// Event Listeners
play.addEventListener("click", () =>
  isSongPlaying ? pauseSong() : playSong()
);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
progress.addEventListener("click", setProgressBar);
songAudio.addEventListener("timeupdate", updateProgress);
songAudio.addEventListener("ended", nextSong);

// On Load - Load first song;
loadSong(songs[songIndex]);
