import React, { useState } from 'react';
import '../css/ExploreServices.css';
import { Link } from 'react-router-dom';

const ExploreServices = () => {
  const [selectedMainTab, setSelectedMainTab] = useState('Online');
  const [selectedSubTab, setSelectedSubTab] = useState('Class 9');

  const subjects = {
    'Class 8': [
      { name: 'Science', icon: '🧪' },
      { name: 'Social Science', icon: '🌍' },
      { name: 'Maths', icon: '🔢' },
      { name: 'English', icon: '📚' },
      { name: 'GK', icon: '🧠' },
      { name: 'IT', icon: '💻' },
      { name: 'MIL', icon: '🗣️' }
    ],
    'Class 9': [
      { name: 'Science', icon: '🧪' },
      { name: 'Social Science', icon: '🌍' },
      { name: 'Maths', icon: '🔢' },
      { name: 'English', icon: '📚' },
      { name: 'GK', icon: '🧠' },
      { name: 'MIL', icon: '🗣️' }
    ],
    'Class 10': [
      { name: 'Science', icon: '🧪' },
      { name: 'Social Science', icon: '🌍' },
      { name: 'Maths', icon: '🔢' },
      { name: 'English', icon: '📚' },
      { name: 'MIL', icon: '🗣️' }
    ],
    'Class 11': [
      { name: '11 Science', icon: '🧪' },
      { name: '11 Arts', icon: '📝' },
      { name: '11 Commerce', icon: '💼' }
    ],
    'Class 12': [
      { name: '12 Science', icon: '🧪' },
      { name: '12 Arts', icon: '📝' },
      { name: '12 Commerce', icon: '💼' }
    ],
  };

  const handleMainTabClick = (tab) => {
    if (tab === 'Online') {
      setSelectedMainTab(tab);
    }
  };

  const handleSubTabClick = (subTab) => {
    if (selectedMainTab === 'Online') {
      setSelectedSubTab(subTab);
    }
  };

  return (
    <div id="explore-services" className="explore-services-container">
      <div className="explore-services-canvas">
        <h1 className="explore-services-title">Explore Services</h1>

        <div className="tabs-container">
          <div className="main-tabs">
            <button className={`tab ${selectedMainTab === 'Online' ? 'selected' : ''}`} onClick={() => handleMainTabClick('Online')}>Online</button>
            <button className={`tab ${selectedMainTab === 'Classroom' ? 'selected' : ''}`} onClick={() => handleMainTabClick('Classroom')} disabled title="Upcoming feature">Classroom Training <span className="lock-icon">🔒</span></button>
            <button className={`tab ${selectedMainTab === 'Software Development' ? 'selected' : ''}`} onClick={() => handleMainTabClick('Software Development')} disabled title="Upcoming feature">Software Development <span className="lock-icon">🔒</span></button>
          </div>

          <div className="sub-tabs">
            <button className={`sub-tab ${selectedSubTab === 'Class 8' ? 'selected' : ''}`} onClick={() => handleSubTabClick('Class 8')}>Class 8</button>
            <button className={`sub-tab ${selectedSubTab === 'Class 9' ? 'selected' : ''}`} onClick={() => handleSubTabClick('Class 9')}>Class 9</button>
            <button className={`sub-tab ${selectedSubTab === 'Class 10' ? 'selected' : ''}`} onClick={() => handleSubTabClick('Class 10')}>Class 10</button>
            <button className={`sub-tab ${selectedSubTab === 'Class 11' ? 'selected' : ''}`} onClick={() => handleSubTabClick('Class 11')}>Class 11</button>
            <button className={`sub-tab ${selectedSubTab === 'Class 12' ? 'selected' : ''}`} onClick={() => handleSubTabClick('Class 12')}>Class 12</button>
          </div>
        </div>

        <div className="cards-container">
          {selectedSubTab && subjects[selectedSubTab] && subjects[selectedSubTab].map((subject, index) => (
            <div className="service-card" key={index}>
              <div className="card-icon">{subject.icon}</div>
              <h3 className="card-title">{subject.name}</h3>
              <p className="card-subtitle"></p>
            </div>
          ))}
        </div>

        <Link to="/courses">
          <button className="show-all-button">Show all services</button>
        </Link>
      </div>
    </div>
  );
};

export default ExploreServices;