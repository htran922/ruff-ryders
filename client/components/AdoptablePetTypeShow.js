import React, { useState, useEffect } from "react"
import AdoptionForm from "./AdoptionForm"

const AdoptablePetTypeShow = props => {
  const [adoptablePet, setAdoptablePet] = useState({})
  const [showAdoptionForm, setShowAdoptionForm] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)

  const { id } = props.match.params
  const getAdoptablePet = async () => {
    try {
      const response = await fetch(`/api/v1/adoptable-pets/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setAdoptablePet(responseBody.adoptablePet)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getAdoptablePet()
  }, [])

  const handleAdoptMeClick = () => {
    setShowAdoptionForm(true)
  }

  const handleFormSuccess = () => {
    setSuccessMessage("Application received! Your request is in process")
  }

  return (
    <div className="pet-detail-body">
      <div className="pet-detail-container">
        <div className="pet-detail-left">
          <h1>Hi, my name is {adoptablePet.name}!</h1>
          <div className="pet-detail-img">
            <img src={adoptablePet.imgUrl} />
          </div>
          <div className="pet-detail-stats">
            <p>Age: {adoptablePet.age}</p>
            <p>Vaccinated: {adoptablePet.vaccinationStatus ? "Yes" : "No"}</p>
          </div>
        </div>
        <div className="pet-detail-right">
          <div className="pet-detail-story">
            <h4>Who am I?</h4>
            <p>{adoptablePet.adoptionStory}</p>
          </div>
          <button className="pet-adopt-me-btn" type="button" onClick={handleAdoptMeClick}>
            Adopt Me!
          </button>
          {showAdoptionForm ? (
            <AdoptionForm
              id={props.match.params.id}
              type={props.match.params.type}
              adoptablePetId={adoptablePet.id}
              onFormSubmit={handleFormSuccess}
            />
          ) : null}
          <div>{successMessage}</div>
        </div>
      </div>
    </div>
  )
}

export default AdoptablePetTypeShow
