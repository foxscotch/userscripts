// ==UserScript==
// @name         Image Hider
// @namespace    http://foxscotch.net/
// @version      1
// @description  Hides images on the forum
// @author       You
// @match        http://forum.blockland.us/index.php*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
"use strict";

// Change this to true if you want to hide images in signatures too
var includeSignatures = false;

var images = [];

if (window.location.search.startsWith("?action=pm")) {
  images = images.concat(
    Array.prototype.slice.call(
      document.querySelectorAll(".personalmessage img")
    )
  );
  if (includeSignatures) {
    images = images.concat(
      Array.prototype.slice.call(document.querySelectorAll(".signature img"))
    );
  }
} else if (window.location.search.startsWith("?topic=")) {
  images = images.concat(
    Array.prototype.slice.call(document.querySelectorAll(".post img"))
  );
}

function hideImage(img, btn) {
  if (img.hidden) {
    img.hidden = false;
    btn.value = "Hide";
  } else {
    img.hidden = true;
    btn.value = "Show";
  }
}

function addButtons() {
  for (var i = 0; i < images.length; i++) {
    images[i].hidden = true;

    var btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Show";
    btn.style.display = "block";

    btn.addEventListener("click", hideImage.bind(null, images[i], btn));

    images[i].parentElement.insertBefore(btn, images[i]);
  }
}

addButtons();
