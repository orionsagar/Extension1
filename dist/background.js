/******/ (() => { // webpackBootstrap
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
// chrome.runtime.onInstalled.addListener(() => {
//     console.log("I just installed my chrome extension")
// });


// chrome.bookmarks.onCreated.addListener(() => {
//     console.log("I just bookmarked this page")
// });




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


  // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //   if (message.action === 'SET_FORM_VALUES') {
  //     // Get the active tab and send the form values to the content script
  //     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //       console.log("Tab :" + tabs[0]);
  //       chrome.runtime.sendMessage({ action: 'SET_FORM_VALUES', data: message.data }, (response) => {
  //         console.log('Response from content script:', response);
  //       });

  //       //const activeTabId = tabs[0];
  //       //if (activeTabId) {
  //       //  chrome.tabs.sendMessage(activeTabId.id, { type: 'SET_FORM_VALUES', data: message.data }, (response) => {
  //       //    console.log('Response from content script:', response);
  //       //  });
  //       //}
  //     });
  //     sendResponse({ message: 'Form values received and forwarded to content script' });
  //   }
  // });


  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   //if (tabs.length > 0) {
  //     const tabId = tabs[0].id;
  
  //     // chrome.tabs.sendMessage(tabId, { message: "Hello from background!" }, function (response) {
  //     //   if (chrome.runtime.lastError) {
  //     //     console.log("Error sending message:" + tabId, chrome.runtime.lastError);
  //     //   } else {
  //     //     console.log("Message sent successfully:", response);
  //     //   }
  //     // });

  //     // Inject content script if it isn't already injected
  // chrome.scripting.executeScript(
  //   {
  //     target: { tabId: tabId },
  //     files: ["contentScript.js"],
  //     args: ["Hello from the extension"],
  //   },
  //   () => {
  //     if (chrome.runtime.lastError) {
  //       console.log(chrome.runtime.lastError.message);
  //     } else {
  //       chrome.tabs.sendMessage(tabId, { greeting: "hello from background" });
  //     }
  //   }
  // );
  //   //} else {
  //   //  console.warn("No active tabs found.");
  //   //}
  // });


  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Received message in content script:', request);
    

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length) {
        if (request.action === 'SET_FORM_VALUES') {
          console.log('Received message in content script!');

          chrome.tabs.sendMessage(tabs[0].id, { action: request.action, data: request.data }, (response) => {
            if (response) {
              console.log('Received response from content script:', response);
            } else {
              console.log('No response from content script.');
            }
          });
          sendResponse({ message: 'Hello back from content script!' });
    
        }
        
      }
    });
  });
/******/ })()
;
//# sourceMappingURL=background.js.map