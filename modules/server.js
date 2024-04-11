// apiResponse is the result of the apiReq function. Do not call the variable as "apiResponse" please use "apiResponse[0]"

// the URL for the api.
const api = "dragon.api.myxapk.tech";
const pluginApi = "memblu-marketplace.memblu.repl.co"
let apiResponse;
let socket = new SimpleSocket({
  project_id: "658feac47d62dd1261e8c283",
  project_token: "client_60059ad91809cb92052a4004fa70b1cb293"
});

let wsConn;

// function for making a request to the API. (do not include the first slash in an endpoint.)
function betterFetch(url, payload) {
  let responseValue;
  
  let createRequest = async function(payload) {
    let request = await fetch(url, payload);
    let response = await request.text();
    return response;
  };
  
  let promise = Promise.all([createRequest(payload)]).then(async (values) => {
    let simply = await values;
    console.log(simply);
    
    window.responseValue = new Promise((resolve, reject) => {
      resolve(simply);
    });
  });

  return new Promise((resolve, reject) => {
    console.log(window.responseValue);
    resolve({ response: window.responseValue, promise: promise });
  });
}

function apiReq(endpoint, payload) {
  return betterFetch(`https://${api}/${endpoint}`, payload);
}

function marketplaceApiReq(endpoint, payload) {
  return betterFetch(`https://${pluginApi}/${endpoint}`, payload);
}

function websocketConnect() {
  wsConn = new WebSocket(`wss://${api}/api/postsock`);
}

async function simpleReq(endpoint, payload, callback) {
  let re = await fetch(`https://${api}/${endpoint}`, payload);
  let res = await re.text(); 
  return res;
}

// This function is used by Mixxer and Cubic, as the other ones are too compilcated.
function superReq(url, payload, callback) {
  let xhr = new XMLHttpRequest();
  
  xhr.open(payload?.method || "GET", url);
  
  if (payload?.hasOwnProperty("headers")) {
    for (let key in payload.headers) {
      const value = payload.headers[key];
      xhr.setRequestHeader(key, value);
      console.log(key, value);
    }
  }

                  
  xhr.send(payload?.body || null);
  xhr.onload = () => {
    callback(xhr);
  }
}

// to create x-www-form-urlencoded bodies out of JSON.

function encodeBody(json) {
  let formBody = [];
  
  for (let [key, value] of Object.entries(json)) {
    var encodedKeyName = encodeURIComponent(key);
    var encodedkeyValue = encodeURIComponent(value);

    formBody.push(`${encodedKeyName}=${encodedkeyValue}`);
  }

  formBody = formBody.join("&");
  return formBody;
}

(() => {
  const a = parseInt(localStorage.__R);

  superReq(`https://${api}/__r`, null, callback);

  function callback(re) {
    let json = JSON.parse(re.responseText);
    
    if (json.__R > a) {
      localStorage.__R = json.__R;
      
      localStorage.removeItem("userInfo");

      window.location.reload();
    }
  }
})();