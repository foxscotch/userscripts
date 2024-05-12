// ==UserScript==
// @name        w2g ui enhancements
// @namespace   w2g
// @match       https://w2g.tv/en/room/*
// @grant       none
// @version     1.1
// @author      Foxscotch
// @description A few small enhancements to the w2g ui
// ==/UserScript==

// Fix the weirdness with the video player's max height and width

const playerSearch = document.getElementsByClassName("w2g-player-search")[0];
playerSearch.style.maxWidth = "100%";

const videoContainer = document.getElementsByClassName(
  "w2g-video-container"
)[0];
videoContainer.style.maxHeight = "calc(100vh - 100px)"; // just enough to be out of the way of the user list button thing

// Changes the help/feedback button on the right to a button that toggles the main sidebar

const toggleButton = document.getElementsByClassName("w2g-feedback")[0];
toggleButton.innerHTML = "Toggle sidebar";

const sidebar = document.getElementsByClassName("w2g-main-right")[0];
const originalState = sidebar.style.display;

toggleButton.onclick = () => {
  sidebar.style.display =
    sidebar.style.display === originalState ? "none" : originalState;
  return false;
};
