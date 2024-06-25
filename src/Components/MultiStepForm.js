import React, { useState, useEffect } from 'react';
import PersonalInformation from './PersonalInformation';
import AddressInformation from './AddressInformation';
import Confirmation from './Confirmation';
import Tabs from './Tabs';
import './MultiStepForm.css';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const validateStep = () => {
    let validationErrors = {};
    switch (currentStep) {
      case 0:
        validationErrors = validatePersonalInfo(formData);
        break;
      case 1:
        validationErrors = validateAddressInfo(formData);
        break;
      default:
        break;
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    alert('Form submitted!');
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: ''
    });
    setCurrentStep(0);
    setErrors({});
    localStorage.removeItem('formData');
  };

  return (
    <div className="multi-step-form">
      <Tabs currentStep={currentStep} />
      {currentStep === 0 && <PersonalInformation formData={formData} handleChange={handleChange} errors={errors} />}
      {currentStep === 1 && <AddressInformation formData={formData} handleChange={handleChange} errors={errors} />}
      {currentStep === 2 && <Confirmation formData={formData} />}
      <div className="navigation-buttons">
        {currentStep > 0 && <button onClick={handleBack}>Back</button>}
        {currentStep < 2 && <button onClick={handleNext}>Next</button>}
        {currentStep === 2 && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
};

const validatePersonalInfo = (data) => {
  const errors = {};
  if (!data.name) errors.name = 'Name is required';
  if (!data.email) errors.email = 'Email is required';
  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) errors.email = 'Invalid email format';
  if (!data.phone) errors.phone = 'Phone number is required';
  return errors;
};

const validateAddressInfo = (data) => {
  const errors = {};
  if (!data.address1) errors.address1 = 'Address Line 1 is required';
  if (!data.city) errors.city = 'City is required';
  if (!data.state) errors.state = 'State is required';
  if (!data.zip) errors.zip = 'Zip Code is required';
  return errors;
};

export default MultiStepForm;