// ==UserScript==
// @name         TVTropes: Mouseover removes spoiler
// @namespace    http://foxscotch.net/
// @version      0.1
// @description  Mousing over a spoiler removes the spoilerness, then returns it back to its original state after your mouse leaves it.
// @author       Foxscotch
// @match        http://tvtropes.org/*
// @grant        none
// ==/UserScript==

var spoilers = $('.spoiler');

spoilers.attr('title', '');
spoilers.mouseover(function () {
    $(this).removeClass('spoiler');
});
spoilers.mouseout(function () {
    $(this).addClass('spoiler');
});
