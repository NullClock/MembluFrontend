/* 

DEFINITIONS:

Wireframes [
  The system for updating the pageHolder using URL hashtags.

  PROS:
   - The page will not need to refresh or load any longer.
  CONS:
   - URL has ugly hashtag, less clean
]

The hashtags are there on purpose.

*/

function decideUserPfp() {
  userInfo = JSON.parse(localStorage.getItem("userInfo"));
  
  if (userInfo?.userInfo?.image == null) {
    return defaultUserImg;
  } else {
    return userInfo.userInfo.image;
  }
}

function decideUserUsername() {
  userInfo = JSON.parse(localStorage.getItem("userInfo"));
  
  if (userInfo?.userInfo?.user == null) {
    return "Guest";
  } else {
    return userInfo.userInfo.user;
  }
}

let wireframes = {};

// allows wireframed pages to load code.
wireframes.code = {};

// wireframe for the homepage
wireframes.home = `
  <title>Home / Memblu</title>
  <div style="display: flex;" class="newPost">
  <div>
  <img id="newPostUserPfp" class="thisUserPfp" src="${decideUserPfp()}">
  </div>
  <div class="newPostSectionContent">
  <input id="imageInput" type="file" accept="image/*" multiple="true" hidden="true">
  <span id="newPostUsername">${decideUserUsername()}</span>
  <div id="newPostArea" contenteditable placeholder="Type for free cookie 🍪"></div>
  </div><button class="newPostButton">Post</button></div></div><div style="display:none" class="postBox" id="newPosts"><p style="margin-left: 32%;">New posts! Click to view</p></div>`;

// wf for the profile page
wireframes.profile = `<div class="profile">Test</div>`
// wf: community
wireframes.community = `<h1>Community</h1><div id="exampleGroup"><h2>Space Name</h2><button>Leave Space</button></div>`;
// wf: settings
wireframes.settings = `
<div class="settingsBox"><label for="music">Background Music:<br></label>
  <select name="music" id="music-dropdown">
    <option value="None">None</option>
  </select><br>
  <span style="font-size: 15px;">Currently playing: </span><pre id="cplaying"></pre>
</div>
<div class="settingsBox"><label for="themes">Theme<br></label>
  <select name="theme" id="theme-dropdown">
    
  </select></div>
  <button class="exotekmanage" onclick="openExotekManage()">Manage Exotek Account</button><br>
  <span>When you update your Exotek account, you will have to re-install your Memblu account.</span><br>
  <button onclick="reinstall()">Re-install account</button>
  <br><br>
  <span>
    <h2>What is Exotek?</h2><hr>
    Exotek is our login provider, Profile picture provider, and the username provider. All data in your profile is inherited from Exotek!
  </span><br>
  `

function reinstall() {
  showPopUp("Are you sure?", "You will be logged out.", [[ "Ok.", "var(--themeColor)", reinstallConf ], [ "Cancel.", "var(--grayColor)" ]]);
}

function reinstallConf() {
  userInfo = {};
  localStorage.removeItem("userInfo");

  window.location.href = "/#home";
}

function openExotekManage() {
  window.open("https://exotek.co/account#manage", "_blank");
}

wireframes.createTheme = ""

// wf: info
//wireframes.info = "";
// wf code: homepage
wireframes.code.home = "loadScript('/pageScripts/home.js')";
//wf code: settings
wireframes.code.settings = "loadScript('/pageScripts/settings.js')"

wireframes.code.createTheme = "loadScript('/pageScripts/themeCreator.js')"

// other stuff

// defines the pageHolder variable, the holder for the wireframed pages
window.pageHolder = document.getElementsByClassName("pageHolder")[0];
// the navbar. previously sidebar but the variable wasn't renamed.
window.sidebarButtons = document.getElementById("buttons");
// idk what this is but i'm not removing it lmao
window.clickableSidebarElements = ["P", "BUTTON"];

// when a button in the navbar is clicked, it will take you to the wireframe page of the button 
sidebarButtons.addEventListener("click", function(event) {
  if (clickableSidebarElements.includes(event.srcElement.tagName)) {
    if (event.srcElement.tagName == "P") {
      return openPage(event.srcElement.textContent.toLowerCase());
    }
    openPage(event.srcElement.children[0].textContent.toLowerCase(), event.srcElement.children[0].textContent);
  }
});

// the function to open a wireframe page (and run its code if any).
function openPage(page) {
  pageHolder.replaceChildren();
  if (window.location.hash.length < 2) {
    window.location.hash = `#home`
    pageHolder.innerHTML = wireframes.home
    return eval(wireframes.code.home)
  }

  document.title = `${page.charAt(0).toUpperCase() + page.slice(1)} / Memblu`.replace(/([a-zA-Z])([A-Z])([a-z])/g, '$1 $2$3');

  window.location.hash = `#${page}`;
  pageHolder.innerHTML = wireframes[page];
  if (wireframes.code[page] !== null) {
    eval(wireframes.code[page]);
  }
  if (wireframes[page] == null || wireframes[page] == undefined) {
    (async () => {
      //  const notFoundPage = await fetch("https://chat.memblu.live/assets/404.html");
      //  const notFoundPageHTML = await notFoundPage.text();
      // return document.body.innerHTML = notFoundPageHTML;
      pageHolder.innerHTML = `<iframe src="https://chat.memblu.live/assets/404.html" width="655px" height="655px" style="border: none;"></iframe>`;
       return;
    })();
  }
}

// opens the page for the current URL hash.
openPage(window.location.hash.substring(1));

// defines HTML for the specified wireframe (will be useful for Memblu plugins.)
function defineFrame(name, code) {
  wireframes[name] = code;
}

// defines code for the specified wireframe (will be useful for Memblu plugins.)
function defineFrameCode(name, code) {
  wireframes.code[name] = code;
}

// every 50 miliseconds, this checks to see if the title is undefined, and if the title is undefined, it will change it to Page Not Found.
setInterval(() => {
  if (document.title == "undefined / Memblu") {
    document.title = "Page Not Found / Memblu"
  }
}, 50);

window.onhashchange = () => {
  openPage(window.location.hash.substring(1));
}