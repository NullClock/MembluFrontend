let vars = ["bgColor", "fontColor", "contentColor1", "contentColor2", "contentColor3", "contentColor4", "themeColor"]
let defaults = ["000619", "ffffff", "000c33", "000e3d", "001e80", "3363ff", "0093ff"]

function readTheme(code, save) {
  let str = code;
  str = str.split("⬢")
  if (str.length !== vars.length) return "Not enough Params";
  for (let i = 0; i < str.length; i++) {
    document.documentElement.style.setProperty(`--${vars[i]}`, `#${str[i] == "default" ? defaults[i] : str[i]}`)
  }
  if (save > 0) {
    localStorage.theme = code;
  }
  return str;
}

let themes = {}
themes.dark = "000619⬢ffffff⬢000c33⬢000e3d⬢001e80⬢3363ff⬢0093ff"
themes.light = "b3c4ff⬢dedede⬢8fa9ff⬢a8c1ff⬢809dff⬢c7d4ff⬢90d9fe"
themes.noir = "000000⬢ffffff⬢131313⬢000000⬢131313⬢ffffff⬢515151"
themes.hackerMode = "000000⬢ffffff⬢141414⬢0f0f0f⬢000000⬢37ff00⬢37ff00"

let temp = Object.keys(themes)[Object.values(themes).indexOf(localStorage.theme)];

if (localStorage.theme == undefined || temp == undefined) {
  localStorage.theme == themes.dark
  temp = "dark"
}

readTheme(Object.values(themes)[Object.keys(themes).indexOf(temp)], 1)