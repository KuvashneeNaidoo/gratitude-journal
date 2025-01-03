import React, { useState } from "react";
import "./styles.css";
import Navbar from "./Navbar";

const Affirmations = ({ onLogout }) => {
  const [affirmations] = useState([
    "I am capable of achieving my goals.",
    "I deserve happiness and success.",
    "I am confident and courageous.",
    "I am worthy of love and respect.",
    "I am strong and resilient.",
    "I am grateful for the good things in my life.",
    "I trust myself to make the right decisions.",
    "I learn and grow from challenges.",
    "I am at peace with who I am.",
    "I radiate positivity and kindness.",
    "I attract opportunities that help me grow.",
    "I am in control of my own happiness.",
    "I choose to focus on what I can control.",
    "I am open to new possibilities and experiences.",
    "I am proud of what I have achieved.",
  ]);

  const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0);
  const [displayedAffirmations, setDisplayedAffirmations] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const startAffirmations = () => {
    setDisplayedAffirmations(
      affirmations.sort(() => 0.5 - Math.random()).slice(0, 10)
    );
    setCurrentAffirmationIndex(0);
    setIsComplete(false);
  };

  const showNextAffirmation = () => {
    if (currentAffirmationIndex < 9) {
      setCurrentAffirmationIndex(currentAffirmationIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  return (
    <div className="affirmations-container">
      <h1 className="affirmations-header">Daily Affirmations</h1>
      {displayedAffirmations.length === 0 && !isComplete ? (
        <button className="start-button" onClick={startAffirmations}>
          Start Your Affirmations
        </button>
      ) : (
        <div>
          {!isComplete ? (
            <div>
              <p className="affirmation-text">
                {displayedAffirmations[currentAffirmationIndex]}
              </p>
              <button className="next-button" onClick={showNextAffirmation}>
                Next Affirmation
              </button>
            </div>
          ) : (
            <div className="congratulations-message">
              <h2>Congratulations!</h2>
              <p>You have completed your daily affirmations. Great job!</p>
              <button className="start-button" onClick={startAffirmations}>
                Start Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Affirmations;
