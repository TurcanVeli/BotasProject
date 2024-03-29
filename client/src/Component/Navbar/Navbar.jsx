


import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap,faServer, faFileLines} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const horiSelector = document.querySelector('.hori-selector');
    const tabs = document.querySelectorAll('.main-navbar li');

    const updateSelector = (index) => {
      const activeTabItem = tabs[index];
      const activeWidth = activeTabItem.offsetWidth;
      const activeLeft = activeTabItem.getBoundingClientRect().left;

      horiSelector.style.width = `${activeWidth}px`;
      horiSelector.style.left = `${activeLeft}px`;
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        setActiveTab(index);
        updateSelector(index);
      });
    });

    updateSelector(activeTab);

    return () => {
      tabs.forEach((tab, index) => {
        tab.removeEventListener('click', () => {});
      });
    };
  }, [activeTab]);

  return (
    <div id="navbar-animmenu">
      <ul className="show-dropdown main-navbar">
        <div className="hori-selector"></div>
        <li className={activeTab === 0 ? 'active' : ''}>
          <Link to = "/" className="navbar-link"><FontAwesomeIcon icon={faMap} />Home</Link>
        </li>
        <li className={activeTab === 1 ? 'active' : ''}>
          <Link to="roottree" className="navbar-link"><FontAwesomeIcon icon={faServer} />Devices</Link>
        </li>
        <li className={activeTab === 2 ? 'active' : ''}>
          <Link to="OutageReport" className="navbar-link" ><FontAwesomeIcon icon={faFileLines} />Outage Report</Link>
        </li>
        
      </ul>
    </div>
  );
}

export default Navbar;
