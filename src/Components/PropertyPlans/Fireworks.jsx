// Fireworks.js
import React, { useEffect, useRef } from "react";
import { Fireworks } from "fireworks-js";  // Ensure you have installed fireworks-js

const FireworksComponent = () => {
  const fireworksContainerRef = useRef(null);

  useEffect(() => {
    const container = fireworksContainerRef.current;
    const fireworks = new Fireworks(container, {
      autoresize: true,
      opacity: 0.5,
      acceleration: 1.05,
      friction: 0.97,
      gravity: 1.5,
      particles: 500,
      traceLength: 100,
      traceSpeed: 10,
    });

    fireworks.start();

    setTimeout(() => {
      fireworks.stop();
    }, 50000); // Stop fireworks after 10 seconds

    return () => {
      fireworks.stop();
    };
  }, []);

  return <div ref={fireworksContainerRef} className="fireworks-container" style={{ position: "absolute", top: "-500px", left: 0, zIndex: 1, width: "100%", height: "100%" }}></div>;
};

export default FireworksComponent;
