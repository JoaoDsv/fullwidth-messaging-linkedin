'use strict';

function manipulateDOM() {
  let asideElement = document.querySelector('.scaffold-layout__aside');
  asideElement.remove();

  let gridElement = document.querySelector('.scaffold-layout__content--has-aside');
  gridElement.style.gridTemplateColumns = '1fr';

  let parentElement = document.querySelector('.scaffold-layout-container--reflow');
  parentElement.style.width = '96%';
}

// once extension's popup is rendered
document.addEventListener('DOMContentLoaded', function () {
  // add on click event on primary button
  let runButton = document.getElementById('cta-switch-to-full-width');
  runButton.addEventListener('click', function () {
    // access current tab to manipule its DOM
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let currentTab = tabs[0];
      let tabId = currentTab.id;

      chrome.scripting.executeScript({
        target: { tabId },
        function: manipulateDOM,
      });
    });
  });
});
