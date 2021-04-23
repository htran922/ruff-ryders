import React, { useState, useEffect } from "react"
import PetTypeTile from "./PetTypeTile.js"

const PetTypesList = props => {
  const [petTypes, setPetTypes] = useState([])

  const getPetTypes = async () => {
    try {
      const response = await fetch("/api/v1/pet-types")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setPetTypes(responseBody.petTypes)
    } catch (error) {
      console.error(`There was an error in fetch: ${error}`)
    }
  }

  useEffect(() => {
    getPetTypes()
  }, [])

  const allPetTypes = petTypes.map(type => {
    return (
      <PetTypeTile
        key={type.id}
        type={type.type}
        url={type.imgUrl}
        description={type.description}
      />
    )
  })

  return (
    <div>
      <div className="landing-container">
        <div className="landing-image">
          <img src="./images/landing.jpg" alt="human with dog sunny day"/>
        </div>
        <h2 className="landing-text">Helping people adopt pets</h2>
        <button type="button" className="button primary large landing-button">Learn More</button>
      </div>
      <div className="landing-paw-image">
        <img src="./images/paw.png" alt="dog paw"/>
      </div>
      <hr></hr>
      <h2 className="text-center">See all pets available for adoption</h2>
      <div className="grid-x">
        {allPetTypes}
      </div>
    </div>
  )
}

export default PetTypesList
