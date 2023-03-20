import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import TwitterImageSearch from './components/TwitterImageSearch';

// pass in these props into the componen

// handleTags={setTags}
// handleCategory={setCategory}
// handleClear={() => {
//   setTags('');
//   setCategory('');
// }}



const App = () => {

  // search for images
    
  return (
    <div className="App flex flex-col items-center justify-center">
 <TwitterImageSearch />


   
    </div>


  


  );
};

export default App;
