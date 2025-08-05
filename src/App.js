import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.png';

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!loaded) {
    return (
      <div className="intro-screen">
        <img src={logo} alt="Revival Defense Logo" className="intro-logo" />
        <h1 className="intro-text">Powered by Revival Defense</h1>
      </div>
    );
  }

  return (
    <div className="main-container">
      <section className="overview">
        <h2>Suppressor Compatibility Resource</h2>
        <p>
          Welcome to the Revival Defense compatibility database. Begin by selecting a mounting system or manufacturer below.
        </p>
      </section>

      <section className="grid-section">
        <h3>Mounting Systems</h3>
        <div className="grid">
          {['Plan B', 'CAT 1x16LH', 'KeyMo', 'ASR'].map((name) => (
            <div key={name} className="card">
              <div className="card-image placeholder"></div>
              <div className="card-title">{name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid-section">
        <h3>Silencer Manufacturers</h3>
        <input className="search" type="text" placeholder="Search manufacturers..." />
        <div className="grid">
          {['Otter Creek', 'Dead Air', 'Aero Precision', 'HuxWrx'].map((name) => (
            <div key={name} className="card">
              <div className="card-image placeholder"></div>
              <div className="card-title">{name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
