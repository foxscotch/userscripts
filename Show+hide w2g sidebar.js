// ==UserScript==
// @name        Show/hide w2g sidebar
// @namespace   w2g
// @match       https://w2g.tv/en/room/*
// @grant       none
// @version     1.0
// @author      Foxscotch
// @description Changes the help/feedback button on the right to a button that toggles the main sidebar
// ==/UserScript==

const toggleButton = document.getElementsByClassName("w2g-feedback")[0];
toggleButton.innerHTML = "Toggle sidebar";

const sidebar = document.getElementsByClassName("w2g-main-right")[0];
const originalState = sidebar.style.display;

toggleButton.onclick = () => {
  sidebar.style.display =
    sidebar.style.display === originalState ? "none" : originalState;
  return false;
};
