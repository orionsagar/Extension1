import React from "react";


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received:", request);
    if (request.action === 'SET_FORM_VALUES') {
      const formValues = request.formValues;
      // Process the received form values in your content script
      console.log(formValues);
      // Perform actions based on the form values, such as injecting content or modifying the page
    }
  });


// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received 2:", message);
    if (message.action === 'SET_FORM_VALUES') {
        console.log("From Content Script: "+message.data);
      // Handle the received form values
      const { username, description, email } = message.data;
  
      // Find the form fields on the page and set their values
      const full_name = document.querySelector('input[name="full_name"]') as HTMLInputElement; // Adjust selector
      const your_title = document.querySelector('textarea[name="your_title"]') as HTMLInputElement; // Adjust selector
      const company_name = document.querySelector('input[name="company_name"]') as HTMLInputElement; // Adjust selector
  
      if (full_name) {
        full_name.value = username;
      }
  
      if (your_title) {
        your_title.value = description;
      }
  
      if (company_name) {
        company_name.value = email;
      }
    }
  });

function ContentScript(){
    return (
        <div>
            <h1 className="text-3xl text-green-500">Hello ContentScript</h1>
        </div>
    )
};

export default ContentScript