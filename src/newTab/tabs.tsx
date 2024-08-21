import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import { Link } from 'react-router-dom';


const Tabs = () => {
    return (
        <div>
            <h1 className="text-3xl text-green-500">Tab Hello World</h1>
             <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul> 
           
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/about' element={<About />}/>
                </Routes>
           
            
        </div>
    )
};

export default Tabs;