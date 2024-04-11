// An asterisk (*) after a comment means that the comment may be outdated and data may have changed.

// Any variable that begins or ends with target means the variable has an event listener for clicks, but not by the user, by the code. When the target gets the ".click()" method called on it, another part of the code will preform an action

// Gets the URL params (?key=value&other-key=other-value) and parses them into a variable.
let params = new URLSearchParams(window.location.search);
// Login target. when clicked by user, resolves UserInfo query.
let ExotekLoginButton = document.getElementById("ExotekLoginButton");

// A polyfill for UserAgents who don't have the replaceAll method on the String object (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = (toReplace, replaceWith) => {
    return this.replace(new RegExp(toReplace, "g"), replaceWith);
  }
}

window.loadedPosts = [];

// if (window.location.origin !== "https://chat.memblu.live") {
//   window.document.body.onload = () => {
//     showPopUp("Security warning!", "You are running Memblu, well.. outside of Memblu. Please make sure you trust the author of this mod or client before proceeding.", [[
//       "I do",
//       "var(--themeColor)"
//     ], [
//       "I don't",
//       "var(--grayColor)"
//     ]]);
//   }
// }

// loads a script from another URL
// this is a promise so that it can be awaited or .then-ed, for stuff that must execute after script load.
function loadScript(url) {
  return new Promise((resolve) => {
    let a = document.createElement("script");
    a.src = `${url}`;
    document.body.appendChild(a);

    a.onload = () => {
      resolve();
    }
  });
}

// sets default user pfp
window.defaultUserImg = 
  "https://storage.googleapis.com/replit/images/1688760349013_89f12ffa5f1e586893c422f10b5d80ba.png"

// loads a script from the /modules/ folder (DONT ADD .js)
function loadModule(moduleName) {
  let scriptElem = document.createElement("script");
  scriptElem.src = `/modules/${moduleName}.js`;
  document.body.appendChild(scriptElem);
  return "Success!";
}

let needed = ["simplesocket", "music", "wireframe", "modal", "themes", "logger", "server"];

// Loads all modules required for Memblu's runtime
let initModules = async () => {
  needed.forEach(element => async function() {
    console.log("%cModule Manager", "color: #fcba03; background: black; font-weight: 600; border-radius: 25px; padding-left: 3px; padding-right: 3px; padding-top: 2px; padding-bottom: 2px;", `Module loaded: ${element}`);
    await loadModule(element);
  }());
}

// calls the "initModules" function (to load all required modules)
(async()=>{
  await initModules();
})();

let userInfo;

async function handleAuth(code, state) {
  if (code != null && state != null) {
    const res = await simpleReq("exotek/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: encodeBody({ code }) // Defined in server.js @ 96*
    });
    console.log(res)
    userInfo = JSON.parse(res);
    
    console.log("%cExotek Auth", "color: purple; background: black; font-weight: 600; border-radius: 25px; padding-left: 3px; padding-right: 3px; padding-top: 2px; padding-bottom: 2px;", JSON.parse(res));

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    window.location.href = "/";
  }
}

window.addEventListener("message", async (event) => {
  if (event.data == "oauth_embed_integration") {
    event.source.postMessage("subscribe_oauth_finish", "*");
  } else if (event?.data?.type == "exotekDataF") {
    console.log(event.data)
  } else if (event.origin === "https://exotek.co") {
    let parsedData = JSON.parse(event.data);
    if (parsedData.type == "oauth_finish") {
      window.loginWin.close();
      await handleAuth(parsedData.code, parsedData.state);
    }
  }
});

if (localStorage.getItem("__R") == null) {
  localStorage.setItem("__R", "0");
}