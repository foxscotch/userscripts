// ==UserScript==
// @name         Octoween
// @version      1
// @description  Changes October to Halloween
// @author       Foxscotch
// @match        https://forum.blockland.us/*
// @grant        none
// ==/UserScript==

var el = document.querySelectorAll('td[valign="middle"]')[1];
el.innerHTML = el.innerHTML.replace('October', 'Halloween');
