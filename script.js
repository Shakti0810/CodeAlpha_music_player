const songs = [
  {
    title: "First Song",
    artist: "Artist 1",
    file: "songs/song1.mp3"
  },
  {
    title: "Second Song",
    artist: "Artist 2",
    file: "songs/song2.mp3"
  }
];

let index = 0;
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const durationText = document.getElementById("duration");

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.file;
}
loadSong(songs[index]);

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

nextBtn.addEventListener("click", () => {
  index = (index + 1) % songs.length;
  loadSong(songs[index]);
  audio.play();
  playBtn.textContent = "⏸";
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(songs[index]);
  audio.play();
  playBtn.textContent = "⏸";
});

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  let mins = Math.floor(audio.currentTime / 60);
  let secs = Math.floor(audio.currentTime % 60);
  durationText.textContent = '${mins}:${secs < 10 ?secs: secs}';
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});