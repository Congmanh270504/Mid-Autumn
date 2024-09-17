import React, { useEffect, useRef } from 'react';
import logo from './logo.png';
import './App.css';
import img from './image.png';
import bg from './bg.jpg';
function App() {
  const blinkRefs = useRef(Array.from({ length: 20 }, () => React.createRef()));
  const containerRef = useRef(null);

  useEffect(() => {
    const updatePosition = () => {
      const container = containerRef.current;
      if (container) {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        blinkRefs.current.forEach(blinkRef => {
          const blinkElement = blinkRef.current;
          if (blinkElement) {
            const elementWidth = blinkElement.offsetWidth;
            const elementHeight = blinkElement.offsetHeight;
            const randomX = Math.floor(Math.random() * (containerWidth - elementWidth));
            const randomY = Math.floor(Math.random() * (containerHeight - elementHeight));
            blinkElement.style.position = 'absolute';
            blinkElement.style.left = `${randomX}px`;
            blinkElement.style.top = `${randomY}px`;
          }
        });
      }
    };

    updatePosition(); // Initial position
    const intervalId = setInterval(updatePosition, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <div className="App">
      <header className="App-header !bg-gray-200 " ref={containerRef} style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
      }}>
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{ fontFamily: 'Pacifico, cursive', color: '#FF69B4', fontSize: '2.5em' }}>
          Tặng bạn 1 cái bánh trung thu
        </p>
        {blinkRefs.current.map((blinkRef, index) => (
          <span key={index} ref={blinkRef} className='blink '>
            <img src={img} alt="img" className='w-12' />
          </span>
        ))}
      </header>
    </div>
  );
}

export default App;