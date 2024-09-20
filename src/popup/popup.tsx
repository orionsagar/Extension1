import React, {useState, useEffect} from 'react';
import './popup.css'



const handleInput = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = event.target[0].value
    
    chrome.storage.sync.set({name}, () => {
        console.log(`Name is set to ${name}`);    
    })
}





const Popup = () => {
    useEffect(() => {
        chrome.storage.sync.get(['name'], (result) => {
            console.log(`Name is set to ${result.name}`);
        })
    });

    const [formValues, setFormValues] = useState({
        username: '',
        description: '',
        email: ''
    });
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value
        }));
    };
    
    const handleSubmit = () => {
        console.log("Form submitted:", formValues);
        // Send the form values to the content script
        //chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        //  chrome.tabs.sendMessage(tabs[0].id, {
        //    type: 'SET_FORM_VALUES',
        //    data: formValues
        //  });
        //});

        // chrome.runtime.sendMessage({ action: 'SET_FORM_VALUES', data: formValues }, (response) => {
        //     if (response) {
        //       // Handle the response from the background script
        //       console.log("Popup message: " + response.message);
        //     }
        // });
        console.log("Form submitted11:", formValues);
        chrome.runtime.sendMessage({ action: 'SET_FORM_VALUES', data: formValues }, (response) => {
          console.log(response);
        });
    };
   

    return (
        <div className='h-screen'>
            <h1 className="text-3xl text-green-500">Hello World</h1>
            <form onSubmit={handleInput} className="w-full max-w-sm">
                <input type='text' placeholder="Name" name='name' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
            </form>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Set Value into the form</button>
            <br/>
            <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formValues.description}
          onChange={handleChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <button onClick={handleSubmit}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      >Set Values</button>
            
        </div>
        
    )
};

export default Popup;



// import {createRoot} from 'react-dom/client';
// import "../assets/tailwind.css";

// const test = (
//     <div>
//         <h1 className="text-3xl text-green-500">Hello World</h1>
//         <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
//         <img src="cookies.jpg" alt=""/>
//     </div>
// )

// const container = document.createElement('div')
// document.body.appendChild(container)

// const root = createRoot(container)
// root.render(test)