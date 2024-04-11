// idk where these are defined :skull:
//const newPostButton = document.getElementById("newPosts");
window.pageHolder = document.getElementsByClassName("pageHolder")[0]
window.initPosts = async () => {
  let array = JSON.parse(await simpleReq('posts/get'))
  while (array.indexOf(null) > -1) {
    array.shift();
  }
  loadPosts(array) 
};

window.defaultUserImg = 
  "https://storage.googleapis.com/replit/images/1688760349013_89f12ffa5f1e586893c422f10b5d80ba.png";

// loads all posts in
initPosts();

// sets the title!
document.title =  "Home / Memblu";

// the function to grab all posts from the API and load them in.

function loadPosts(posts) {
  // pageHolder.innerHTML = `
  // <title>Home / Memblu</title>
  // <div style="display: flex;" class="newPost">
  // <div>
  // <img id="newPostUserPfp" class="thisUserPfp" src="${decideUserPfp()}">
  // </div>
  // <div class="newPostSectionContent">
  // <input id="imageInput" type="file" accept="image/*" multiple="true" hidden="true">
  // <span id="newPostUsername">${decideUserUsername()}</span>
  // <div id="newPostArea" contenteditable placeholder="Type for free cookie 🍪"></div>
  // </div><button class="newPostButton">Post</button></div></div>`;
  
  // check if the JSON is stringified
  if (typeof posts == "string") {
    posts = JSON.parse(posts)
  }
  // looping through all the posts grabbed from the api
  for (let [post, index] in posts) {
    // adding the looped post to the DOM
    pageHolder.innerHTML = `${pageHolder.innerHTML}<div style="display: flex;" class="postBox"> <div> <img id="newPostUserPfp" src="${posts[post]?.userImage || defaultUserImg}"> </div> <div class="newPostSectionContent"><div hidden>${posts[post].id}</div><h1 id="newPostUsername">${posts[post].author}</h1><hr><p class="postText">${posts[post].message.includes("<") ? posts[post].message.replaceAll("<", "&lt").replaceAll("&ltbr>", "<br>") : posts[post].message}</p> </div></div>`;

    window.loadedPosts.push(posts[post].id);

    const lastPostFooter = document.createElement("p");

    lastPostFooter.innerText = "Welp, you've reached the end! (For now..)";
    
    if (posts.length == index) {
      pageHolder.append(lastPostFooter);
    }
  }
}

var GoogleLogo = `<div class="glog"><span id="GoogleG"><span style="color: #4285F4;">G</span><span style="color: #DB4437;">o</span><span style="color: #F4B400;">o</span><span style="color: #4285F4;">g</span><span style="color: #0F9D58;">l</span><span style="color: #DB4437;">e</span></span></div>`

function loginWithExotek() {
  const webmodal = webModal("https://exotek.co/login?client_id=64cd495c5e5d4fb36411c588&redirect_uri=https%3A%2F%2F{url}&response_type=code&scope=userinfo&state=OPTIONAL", "Login with Exotek".replace("{url}", window.location.domain.replace("https://", "").replace("http://", "")), "1500", "1500");

  window.loginWin = webmodal;
}

if (localStorage.getItem("userInfo") == undefined) {
  setTimeout(() => {
    showPopUp("Not Logged In", "It seems you are not logged in! Login to get the most out of Memblu. Choose a login provider below to log in.", [
      ["Exotek", "#d63eca", loginWithExotek]
    ]);
  }, 550);
} else {
  userInfo = JSON.parse(localStorage.getItem("userInfo"));

  document.getElementById("newPostUsername").onload = () => {
    document.getElementById("newPostUsername").innerText = userInfo.userInfo.user;
    document.getElementById("newPostUserPfp").src = userInfo.userInfo.image;
  }
}

setTimeout(() => {
  document.querySelector(".newPostButton")
    .addEventListener("click", async () => {
      const post = {
        username: userInfo.userInfo.user,
        text: document.querySelector("div#newPostArea").innerHTML || "Default Message",
        access_token: userInfo.access_token
      }
      const body = encodeBody(post);
      const response = await simpleReq("posts/new",{
        method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        body: body
      })
      if (response.status == 200) {
        openPage("home");
      } else {
        const res = JSON.parse(response.responseText);

        showPopUp("Error", res.message + "<br><br>" + res.error, [[ "Okay", "var(--themeColor)" ]]);
      }

  });
}, 2500)

a = 0;
socket.subscribe({task:"newPost"},function(){
  document.getElementById("newPosts").style.display = ""
  document.getElementById("newPosts").addEventListener("click", () => {
    if (a < 1) {
      a = 1;
      openPage("home");
    }
  });
})