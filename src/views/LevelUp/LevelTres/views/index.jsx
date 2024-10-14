import React, { useState, useRef } from 'react';
import StepOne from '../components/StepOne';
import StepTwo from '../components/StepTwo';
import StepThree from '../components/StepThree';

const LevelTres = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const fileInputRefFrente = useRef(null);
  const fileInputRefDorso = useRef(null);

  const handleNextStep = (step) => {
    setCurrentStep(step);
  };

  const handleVolver = () => {
    setCurrentStep(1);
    if (fileInputRefFrente.current) fileInputRefFrente.current.reset();
    if (fileInputRefDorso.current) fileInputRefDorso.current.reset();
  };

  return (
    <div>
      {currentStep === 1 && <StepOne onNext={() => handleNextStep(2)} onHandleData={() => handleNextStep(3)} />}
      {currentStep === 2 && <StepTwo onBack={() => setCurrentStep(1)} isChecked={isChecked} setIsChecked={setIsChecked} />}
      {currentStep === 3 && <StepThree onBack={handleVolver} fileInputRefFrente={fileInputRefFrente} fileInputRefDorso={fileInputRefDorso} />}
    </div>
  );
};

export default LevelTres;