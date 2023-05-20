'use strict';

function manipulateDOM() {
  let asideElement = document.querySelector('.scaffold-layout__aside');
  asideElement.remove();

  let gridElement = document.querySelector('.scaffold-layout__content--has-aside');
  gridElement.style.gridTemplateColumns = '1fr';

  let parentElement = document.querySelector('.scaffold-layout-container--reflow');
  parentElement.style.width = '96%';
}

function closePopup() {
  window.close();
}

// once extension's popup is rendered
document.addEventListener('DOMContentLoaded', function () {
  // add on click event on primary button
  let runButton = document.getElementById('cta-switch-to-full-width');
  runButton.addEventListener('click', async function () {
    // access current tab to manipule its DOM
    try {
      let tabs = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });
      let currentTab = tabs[0];
      let tabId = currentTab.id;

      await browser.scripting.executeScript({
        target: { tabId },
        func: manipulateDOM,
      });
    } catch (error) {
      console.error(`failed to execute script: ${error}`);
    } finally {
      closePopup();
    }
  });
});
