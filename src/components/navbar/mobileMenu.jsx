import React from 'react';
import ReactDOM from 'react-dom';
import './mobile.css';

class MobileMenu extends React.Component {
  render() {
    return (

      <nav role="navigation">
        <div id="menuToggle">

          <input type="checkbox" />


          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <a href="#"><li>Home</li></a>
            <a href="#"><li>About</li></a>
            <a href="#"><li>Info</li></a>
            <a href="#"><li>Contact</li></a>
            <a href="https://erikterwan.com/" target="_blank"><li>Show me more</li></a>
          </ul>
        </div>
      </nav>
    )
  }
}

export default MobileMenu