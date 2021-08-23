// ==UserScript==
// @name         Star City Games Pagination Fix
// @namespace    http://foxscotch.net/
// @version      1.0
// @description  Fixes the fact that Star City Games's pagination doesn't appear at the bottom of the lists!
// @author       Foxscotch
// @match        http://www.starcitygames.com/tags/*
// @grant        none
// ==/UserScript==

$('.dotted').after($('.links').clone())
