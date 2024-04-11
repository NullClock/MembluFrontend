window.musicEle = document.getElementById("music-dropdown");
window.themeEle = document.getElementById("theme-dropdown");
window.cplaying = document.getElementById("cplaying");

function musicAdd(field, value) {
  if (!musicEle.innerHTML.includes(`<option value="${value}">${field}</option>`)) {
    musicEle.innerHTML = musicEle.innerHTML + `<option value="${value}">${field}</option>`;
  }
}

function themeAdd(field) {
  if (!themeEle.innerHTML.includes(field)) {
    themeEle.innerHTML = themeEle.innerHTML + field;
  }
}

dropdown = [];

for (let thing of music.songs) {
  const key = Object.keys(thing)[0];
  const value = Object.values(thing)[0];

  if (!window.musicI.includes(thing)) {
    window.musicI.push(thing);
  }
}

for (let thing of window.musicI) {
  const key = Object.keys(thing)[0];
  const value = Object.values(thing)[0];

  musicAdd(key, value);
}

Object.keys(themes).forEach(element => {
    themeAdd(`<option value="${element}">${`${element.charAt(0).toUpperCase() + element.slice(1)}`.replace(/([a-zA-Z])([A-Z])([a-z])/g, '$1 $2$3')}</option>`);
  }
);

musicEle.value = currentSong;
temp = Object.keys(themes)[Object.values(themes).indexOf(localStorage.theme)];
themeEle.value = temp;

musicEle.onchange = (event) => {
  const children = [...musicEle.children];
  const a = children[musicEle.selectedIndex].innerText;

  setSong(a);
  playSong(a);

  window.cplaying.innerText = `${currentSong || "Nothing"}`;
}

themeEle.onchange = (event) => {
  var inputText = event.target.value;
  readTheme(themes[inputText],1)
}

window.cplaying.innerText = `${currentSong || "Nothing"}`;

window.cplaying.style.fontSize = "15px";