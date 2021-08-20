// ==UserScript==
// @name         Notion Virtual Space At Bottom
// @namespace    https://foxscotch.net/
// @version      1.1
// @description  Increase the empty space at the bottom of Notion pages.
// @author       Foxscotch
// @match        https://www.notion.so/*
// @icon         https://www.notion.so/images/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let pageContent;

    const timer = setInterval(() => {
        pageContent = document.getElementsByClassName('notion-page-content')[0];
        if (pageContent && pageContent.style.paddingBottom !== "80vh") {
            pageContent.style.paddingBottom = "80vh";
        }
    }, 100);
})();