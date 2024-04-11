// Comments are not neccessary because this code should only be modified by SiriFromPhotop, and Mixxer/ZIGM. They are familiar with this code.



/* 
USAGE:
  showPopUp(<modal title>, <modal content>, <ButtonArray>);

ButtonArray:
  An array with more arrays, the arrays inside the main array following this formula: 
    ["Button Text", "Button Background Color", ButtonActionFunction]

  Example:
     [
       [
         "Close",
         "#000000",
         buttonActionFunction
       ],
       [
         "Continue",
         "lightblue",
         buttonActionFunction
       ]
     ]

  Do not include "()" in the ButtonActionFunction. 
  The ButtonActionFunction is executed on button click. Leave empty or null to close popup.
  It will also close when the function is finished executing.
*/

function webModal(url, title, width, height) {
  width = width || 1000;
  height = height || 650;
  let nw = window.open(url, `${location.host}_social_link_authenticate`, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${((screen.height / 2) - (height / 2) - 100)}, left=${((screen.width / 2) - (width / 2))}`);
  if (!nw || nw.closed || typeof nw.closed == "undefined" || nw.outerHeight === 0) {
    window.location = url;
  }
  return nw;
}

function findI(id) {
  return document.getElementById(id);
}

function findC(id) {
  return document.getElementsByClassName(id)[0];
}

function createElement(name, type, parent, attributes) {
  if (attributes == null) {
    attributes = [];
  }

  let newElement = document.createElement(type);

  if (typeof parent == "string") {
    parent = findI(parent);
  }
  if (parent === null) {
    document.body.appendChild(newElement);
  } else {
    parent.appendChild(newElement);
  }

  let setStyle = "";
  let keys = Object.keys(attributes);
  for (let i = 0; i < keys.length; i++) {
    setStyle += keys[i] + ": " + attributes[keys[i]] + "; ";
  }
  newElement.setAttribute("style", setStyle);
  newElement.setAttribute("class", name);
  return newElement;
}


function showPopUp(title, content, buttons) {
  let modalID = Math.floor(Math.random() * 100000000);
  let modalHTML = `<div class="modalTitle" id="modalTitle${modalID}">${title}</div><div class="modalText" id="modalText${modalID}">${content}</div><div class="modalButtons" id="modalButtons${modalID}"></div>`;
  let backBlur = createElement("modalBackBlur", "div", "body");
  backBlur.id = "backBlur" + modalID;
  let newModal = createElement("modal", "div", backBlur);
  newModal.innerHTML = modalHTML;
  let modalButtons = findI("modalButtons" + modalID);
  for (let i in buttons) {
    let thisButton = createElement("modalButton", "button", modalButtons);
    thisButton.innerHTML = buttons[i][0];
    if (buttons[i][1] != null) {
      thisButton.style.background = buttons[i][1];
    }
    if (i === 0) {
      thisButton.focus();
    }
    if (thisButton.innerText == "Exotek") {
      thisButton.id = "ExotekLoginButton";
    }
    
    thisButton.addEventListener("click", function() {
      if (typeof buttons[i][2] === "function") {
        buttons[i][2]();
      }
      if (buttons[i][3] !== true) {
        backBlur.style.opacity = 0;
        newModal.style.transform = "scale(0.9)";
        setTimeout(function() {
          backBlur.remove();
        }, 199);
      }
    });
  }
  setTimeout(function() {
    backBlur.style.opacity = 1;
    newModal.style.transform = "scale(1)";
  }, 16);
  return modalID;
}

window.loadingM = showPopUp(
  "Loading..",
  "Please wait while THE SOCIAL MEDIA WEBSITE EVER loads.."
);

setTimeout(() => {
  document.querySelector("#backBlur"+loadingM).remove();
}, 2500);