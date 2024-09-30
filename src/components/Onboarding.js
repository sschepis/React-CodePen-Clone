import React from 'react';
import CustomTour from './CustomTour';

const Onboarding = ({ isOpen, setIsOpen }) => {
  const steps = [
    {
      selector: '.editor-container',
      content: 'This is where you write your HTML, CSS, and JavaScript code.',
      position: { x: 100, y: 100 } // You'll need to adjust these positions
    },
    {
      selector: '.pane iframe',
      content: 'Your code output will be displayed here in real-time.',
      position: { x: 300, y: 200 }
    },
    {
      selector: '.chat-pane',
      content: 'Use this chat interface to interact with Claude, our AI assistant.',
      position: { x: 100, y: 300 }
    },
    {
      selector: '.user-info',
      content: 'Monitor your subscription status and token usage here.',
      position: { x: 300, y: 50 }
    },
  ];

  return (
    <CustomTour
      steps={steps}
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
    />
  );
};

export default Onboarding;