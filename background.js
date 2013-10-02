// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Global accessor that the popup uses.

var selectedTab = null;


function updateTab(tab) {
  try {
    chrome.pageAction.show(tab.id);
    selectedTab = tab;
  } catch(e) {
    console.error('no pudo show', e);
    selectedTab = null;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      updateTab(tabs[0]);
    });
  }
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
   console.log('onUpdated', change.status);
   if (change.status == "complete") {
     updateTab(tab);
   }
});

chrome.tabs.onActivated.addListener(function(activeInfo){
   console.log('onActivated');
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    updateTab(tabs[0]);
  });  
});
chrome.tabs.onHighlighted.addListener(function(o) { 
  var tabId = o.tabIds[0]; 
  console.log('onHighlighted');
  chrome.tabs.get(tabId, function(tab) {
    updateTab(tab);
  });  
  
});

chrome.tabs.onRemoved.addListener(function (){
  console.log('onRemoved');
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    updateTab(tabs[0]);
  });
});


// Ensure the current selected tab is set up.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  updateTab(tabs[0]);
});


