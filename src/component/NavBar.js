import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import PropTypes from 'prop-types';

export class NavBar extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">NewsMonkey</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul
                className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                style={{ '--bs-scroll-height': '100px' }}
              >
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li><Link className="nav-link" to="/business">Business</Link></li>
                <li><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
                <li><Link className="nav-link" to="/general">General</Link></li>
                <li><Link className="nav-link" to="/health">Health</Link></li>
                <li><Link className="nav-link" to="/science">Science</Link></li>
                <li><Link className="nav-link" to="/sports">Sports</Link></li>
                <li><Link className="nav-link" to="/technology">Technology</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
