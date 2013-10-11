// popup width and height
var w = 626,
    h = 436;
// services for sharing
var urlLayouts = [
  {
    name: 'fb',
    url: 'http://www.facebook.com/sharer.php?s=100&p[url]=##URL##&p[title]=##TITLE##&p[summary]='
  },
  {
    name: 'twitter',
    url: 'http://twitter.com/intent/tweet?url=##URL##&text=##TITLE##'
  },
  {
    name: 'gplus',
    url: 'https://plus.google.com/share?url=##URL##&text=##TITLE##'
  },
  {
    name: 'gmail',
    url: 'http://mail.google.com/mail/?view=cm&amp;fs=1&amp;tf=1&amp;to=&su=##TITLE##&body=##URL##'
  }, 
  {
    name: 'linkedin',
    url: 'http://www.linkedin.com/shareArticle?mini=true&ro=false&trk=bookmarklet&title=##TITLE##&url=##URL##'
  },
  {
    name: 'tumblr',
    url: 'http://www.tumblr.com/share?v=3&t=##TITLE##&u=##URL##'
  },
  {
    name: 'pinterest',
    url: 'http://pinterest.com/pin/create/button/?url=##URL##'
  }
];


var forEach = Array.prototype.forEach,
$$ = document.querySelectorAll.bind(document);


window.onload = function(){
  forEach.call($$('.js-share-on'), function(v) {
    v.addEventListener('click', function(e) {
      if (v.classList.contains('yes')) {
        v.classList.remove('yes');
      } else {
        v.classList.add('yes');
      }
      
    }, false);
  });

  chrome.runtime.getBackgroundPage(function (background){
    var tab = background.selectedTab;
    var url = tab.url;
    document.getElementById('url').value = url;
    document.getElementById('pageTitle').value = tab.title;
    document.getElementById('shareNow').addEventListener('click', function(e){
      var newUrl = document.getElementById('url').value;
      var newPageTitle = document.getElementById('pageTitle').value;
      forEach.call($$('.js-share-on'), function(v) {
        if (v.classList.contains('yes')) {
          sharer[v.getAttribute('data-sharer')](newUrl, newPageTitle);
        }
      });
    });
  });
};

var sharer = {};
var l = urlLayouts.length;
var i;
var service;
var popupOptions = 'width=' + w + ',height=' + h;
for (i = 0  ; i  < l ; i++) {
  service = urlLayouts[i];
  sharer[service.name] = (function(service){
    return function(url, pageTitle) {
      url = service.url.replace(/##URL##/, encodeURIComponent(url));
      url = url.replace(/##TITLE##/, encodeURIComponent(pageTitle));
      window.open(url, service.name, popupOptions);
      window.close();
    };
  })(service);
}
