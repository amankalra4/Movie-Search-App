import React from 'react';
import './App.css';
import Search from './Search';
import homepic from './HomePage.png';

function App () {
  return (
    <div>
      <div id = 'topDiv'>
        <img src = {homepic} 
             alt = 'Alternate text' 
             style = {{ marginTop: '40px', width: '4%'}} />
        <span> Cinemaite</span>
      </div>
      <Search />
    </div>
  );
}

export default App;
