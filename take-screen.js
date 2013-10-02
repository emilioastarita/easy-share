// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// The background page is asking us to find an address on the page.
if (window == top) {
  chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
    sendResponse(takeScreen());
  });
}

// Search the text nodes for a US-style mailing address.
// Return null if none is found.
var takeScreen = function() {
  var pageTitle = document.title;
  // var body = document.body;
  var info = {};
  info.title = pageTitle;
  
  return info;
};

