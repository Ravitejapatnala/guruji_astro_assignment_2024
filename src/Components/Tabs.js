import React from 'react';

const Tabs = ({ currentStep }) => {
  const steps = ['Personal Information', 'Address Information', 'Confirmation'];

  return (
    <div className="tabs">
      {steps.map((step, index) => (
        <div key={index} className={`tab ${currentStep === index ? 'active' : ''}`}>
          {step}
        </div>
      ))}
    </div>
  );
};

export default Tabs;