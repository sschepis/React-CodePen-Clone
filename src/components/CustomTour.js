import React, { useState, useEffect } from 'react';

const CustomTour = ({ steps, isOpen, onRequestClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onRequestClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="custom-tour-overlay">
      <div className="custom-tour-tooltip" style={{
        position: 'absolute',
        left: `${currentStepData.position.x}px`,
        top: `${currentStepData.position.y}px`,
      }}>
        <p>{currentStepData.content}</p>
        <div className="custom-tour-buttons">
          {currentStep > 0 && (
            <button onClick={handlePrev}>Previous</button>
          )}
          <button onClick={handleNext}>
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTour;