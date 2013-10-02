var forEach = Array.prototype.forEach,
$$ = document.querySelectorAll.bind(document);

window.onload = function(){
  console.log('popup load');
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

sharer.fb = function (url, newPageTitle) {
  var destUrl = '';
  destUrl += 'http://www.facebook.com/sharer.php?s=100';
  destUrl += '&p[url]=' + encodeURIComponent(url);
  destUrl += '&p[title]='+ encodeURIComponent(newPageTitle);
  destUrl += '&p[summary]=';
  window.open(destUrl, 'facebook-share-dialog', 'width=626,height=436');
  window.close();
};

sharer.twitter = function (url, newPageTitle) {
  var destUrl = '';
  destUrl += 'http://twitter.com/intent/tweet?';
  destUrl += 'url=' + encodeURIComponent(url);
  destUrl += '&text='+ encodeURIComponent(newPageTitle);
  window.open(destUrl, 'twitter-share-dialog', 'width=626,height=436');
  window.close();
};

sharer.gplus = function (url, newPageTitle) {
  var destUrl = 'https://plus.google.com/share?url=';
  destUrl += encodeURIComponent(url);
  destUrl += '&text='+ encodeURIComponent(newPageTitle);
  window.open(destUrl, 'gplus-share-dialog', 'width=626,height=436');
  window.close();
};

sharer.gmail = function (url, newPageTitle) {
  var destUrl = 'http://mail.google.com/mail/?view=cm&amp;fs=1&amp;tf=1&amp;to=&su=';
  destUrl +=  encodeURIComponent(newPageTitle);
  destUrl += '&body=' + encodeURIComponent(url);
  window.open(destUrl, 'gplus-share-dialog', 'width=626,height=436');
  window.close();
};

sharer.linkedin = function (url, newPageTitle) {
  var destUrl = 'http://www.linkedin.com/shareArticle?mini=true&ro=false&trk=bookmarklet&title=';
  destUrl +=  encodeURIComponent(newPageTitle);
  destUrl += '&url=' + encodeURIComponent(url);
  window.open(destUrl, 'gplus-share-dialog', 'width=626,height=436');
  window.close();
};
  
sharer.tumblr = function (url, newPageTitle) {
  var destUrl = 'http://www.tumblr.com/share?v=3&t=';
  destUrl +=  encodeURIComponent(newPageTitle);
  destUrl += '&u=' + encodeURIComponent(url);
  window.open(destUrl, 'gplus-share-dialog', 'width=626,height=436');
  window.close();
};
sharer.pinterest = function (url, newPageTitle) {
  var destUrl = 'http://pinterest.com/pin/create/button/?url=';
  destUrl += '' + encodeURIComponent(url);
  window.open(destUrl, 'gplus-share-dialog', 'width=626,height=436');
  window.close();
};
  
