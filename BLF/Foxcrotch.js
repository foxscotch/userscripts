// ==UserScript==
// @name         Foxcrotch
// @version      2
// @description  Better version of the script that changed my name on the blockland forum to "Foxscrotch"
// @author       Foxscotch
// @match        http://forum.blockland.us/*
// @grant        none
// ==/UserScript==

// Goes real fast!! Cus it doesn't need jQuery or anything
b = document.getElementsByTagName("body")[0];
b.outerHTML = b.outerHTML.replace(/([Ff])oxscotch/g, "$1oxcrotch");
