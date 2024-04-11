// properties for the music.
let music = {}

// list of songs.
music.songs = [{ "Memblu.wav": "membluwave" }, { "Nintenblu": "nintenblu" }, { "Como se ve al sol": "como" }, { "Earth's Atmosphere": "atmosphere" }, { "Question": "question" }, { "Wind Down": "wind" }, { "Memblu Galaxy": "memgalaxy" }, { "Misspelled": "misspelled" }, { "Mid Evening": "evening" }, { "Memphone": "memphone" }];

let audio;
let currentSong = localStorage.song !== undefined ? localStorage.song : "None";
let pclicked = false;

window.musicI = [];

if (localStorage.song == undefined) {
  localStorage.song = ""
} else if (localStorage.song !== "") {
  let songName = 0;
  music.songs.forEach(song => {
    if (Object.keys(song)[0] == localStorage.song) {
      songName = song;
      return;
    }
  });
  
  if (songName !== 0) {
    document.onclick = () => {
      if (pclicked) return;
      
      pclicked = true;
      playSong(localStorage.song);
    }
  }
}

function playSong(songName) {
  currentSong = "None";
  let check = 0;
  
  if (songName == "None") {
    try {
      audio.pause()
      localStorage.song = ""
      return;
    } catch (err) { }
  }
  
  music.songs.forEach(element => {
    if (Object.keys(element)[0] == songName) {
      check = element;
      return;
    }
  });
  
  if (check == 0) return;
  
  try {
    audio.pause();
  } catch (err) { }
  audio = new Audio(`assets/music/${Object.values(check)[0]}.mp3`);
  currentSong = Object.keys(check)[0];
  localStorage.song = currentSong;
  audio.play();
  audio.loop = true;
  //return check;

  window.cplaying.innerText = `${currentSong || "Nothing"}`;
}

function setSong(name) {
  localStorage.song = name;

  window.cplaying.innerText = `${name}`;
}

// let oldSong
// setInterval(() => {
//     if (oldSong !== localStorage.song) {
//         oldSong = localStorage.song;
//         playSong(localStorage.song)
//     }
// })