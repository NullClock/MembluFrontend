/* 
@SiriFromPhotop wrote this code either in a rush or lazily but im not gonna bother to fix what already works - Cubic
*/

defaults.forEach(ele => pageHolder.innerHTML = pageHolder.innerHTML + `<input type="color" value="#${ele}" name="${vars[defaults.indexOf(ele)]}" id="${vars[defaults.indexOf(ele)]}"><label for=${vars[defaults.indexOf(ele)]} style="">${vars[defaults.indexOf(ele)]}</label><br>`);

pageHolder.innerHTML = `<button id="preview">Preview Theme</button><button id="export">Export Theme</button><br><button id="import">Import Theme</button><button id="loadFrom">Load from Settings</button><div class="settingsBox">${pageHolder.innerHTML}</div>`;

function exportTheme() {
    let res = "";
    let children = [].slice.call(pageHolder.getElementsByClassName("settingsBox")[0].children);
    children.forEach(element => { if (element.tagName == "INPUT") { res = res + element.value.replace("#","") + "⬢" } });
    res = res.substring(0, res.length - 1);
    return res;
}

function loadTheme(code) {
    let str = code;
    str = str.split("⬢");
    if (str.length < vars.length) return "Not enough Params";
    for (let i = 0; i < str.length; i++) {
      document.getElementById(`${vars[i]}`).value = `#${str[i] == "default" ? defaults[i] : str[i]}`;
    }
    return str;
}

document.getElementById("preview").addEventListener("click",function(){
  readTheme(exportTheme(), 0);
});

document.getElementById("export").addEventListener("click",function(){
  navigator.clipboard.writeText(exportTheme());
  alert("Copied code to clipboard!");
});

document.getElementById("import").addEventListener("click",function(){
  let r = window.prompt("Code:");
  if (r !== null) {
    loadTheme(r);
  }
});

document.getElementById("loadFrom").addEventListener("click",function(){
  loadFrom();
});

function loadFrom() {
  let r = window.prompt("Theme Name:");
  if (themes[r] == undefined) {
    // Updated to showPopUp by CubicDev @ Nov 26 (1:01 AM GMT-5 EST)
    showPopUp("Oops..", "That theme name is invalid!", [[ "Okay.", "var(--themeColor)" ]]);
  }
  loadTheme(themes[r]);
}