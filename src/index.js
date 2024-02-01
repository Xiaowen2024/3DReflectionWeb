import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Input from './input';
import Overlay from './home-overlay';
import reportWebVitals from './reportWebVitals';
import { Canvas } from "@react-three/fiber";
import { BrowserRouter as  Router, Route, Routes } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <Router>
      <Routes>
        
        <Route path="/" element={<App/>}/>
        <Route path="/input" element={<Input/>}/>
        
      </Routes>
    </Router>
        
 
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
