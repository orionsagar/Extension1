/******/ (() => { // webpackBootstrap
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
chrome.runtime.onInstalled.addListener(() => {
    console.log("I just installed my chrome extension")
});


chrome.bookmarks.onCreated.addListener(() => {
    console.log("I just bookmarked this page")
});




//chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//    if (request.action === 'SET_FORM_VALUES') {
//      // Handle the received form values
//      console.log(request.formValues);
//      
//      chrome.runtime.sendMessage({ action: 'SET_FORM_VALUES', request: request.formValues });
//      chrome.runtime.sendMessage({ action: 'SET_FORM_VALUES', payload: request.formValues }, (response) => {
//        console.log('Response from content/background script:', response);
//      });
//      // Send a response back to the popup if needed
//      sendResponse({ message: 'Form values received successfully' });
//    }
//  });


  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'SET_FORM_VALUES') {
      // Get the active tab and send the form values to the content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTabId = tabs[0].id;
        if (activeTabId) {
          chrome.tabs.sendMessage(activeTabId, { type: 'SET_FORM_VALUES', data: message.data }, (response) => {
            console.log('Response from content script:', response);
          });
        }
      });
      sendResponse({ status: 'Form values received and forwarded to content script' });
    }
  });
/******/ })()
;
//# sourceMappingURL=background.js.map