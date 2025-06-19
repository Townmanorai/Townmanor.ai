import React, { useState } from 'react'
import ColivingForm from './ColivingForm'
import ColivingRoomForm from './ColivingRoomForm'

function ColivingMainForm() {
  const [step, setStep] = useState(1)
  const [propertyId, setPropertyId] = useState(null)

  // Handler for when ColivingForm is submitted
  const handleFormSubmit = (id) => {
    setPropertyId(id)
    setStep(2)
  }

  return (
    <div>
      {step === 1 && (
        <ColivingForm onSuccess={handleFormSubmit} />
      )}
      {step === 2 && propertyId && (
        <ColivingRoomForm propertyId={propertyId} />
      )}
    </div>
  )
}

export default ColivingMainForm